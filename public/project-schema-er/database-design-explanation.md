# Research Collaboration Platform

## Complete Database Design Explanation

This document describes the complete database design represented by the enhanced Chen E-R diagram and the relational schema diagram for the Research Collaboration Platform.

It documents:

- The purpose and scope of the platform.
- The conceptual E-R model.
- Every strong entity, subtype, weak entity, relationship, attribute, key, and derived value.
- The specialization hierarchy.
- The aggregation used for profile and publication review.
- The ternary contribution relationship.
- The recursive researcher connection relationship.
- The relational schema and every table column.
- Primary keys, foreign keys, composite keys, partial keys, and bridge tables.
- Cardinality and participation assumptions.
- Mapping rules from the E-R model to relations.
- Integrity constraints and recommended data types.
- Normalization considerations.
- Main system workflows.
- Security, indexing, transaction, and validation recommendations.
- A final consistency checklist for the diagram and database implementation.

The current version of the model uses the following latest decisions:

- `STUDENT_RESEARCHER` has `student_no` and `degree_program` as external attributes.
- `FACULTY_RESEARCHER` has only `designation` as its subtype-specific attribute.
- `RESEARCHER_PROFILE` has `institution` and does not have `country`.
- `RESEARCHER_PROFILE` has the composite attribute `full_name`, composed of `first_name` and `last_name`.
- `RESEARCHER_PROFILE` has the `profile_verified` attribute.
- `PUBLICATION` contains only `publication_id`, `doi`, `title`, and `abstract` in the corrected model.
- Citation history is represented by the weak entity `CITATION_RECORD`.
- `CITATION_RECORD` uses `citation_id` as its partial key, while `citation_year` is a normal attribute.
- `ADMIN` reviews an aggregated contribution occurrence.
- `PUBLICATION_REVIEW` has no `review_id` column.
- `review_status` is the source value used to update `profile_verified`.
- `RESEARCHER_POST` keeps `post_id` and `required_skill` and has `title`, `deadline`, and `role_type` as external attributes in the E-R diagram.
- `APPLICATION` is a separate entity. Its attributes belong to the entity, not to the `APPLIES_FOR` relationship.
- `APPLICATION` stores `applicant_researcher_id` to implement `APPLIES_FOR` and `post_id` to implement the post-to-application relationship.
- One research post can have many applications, while each application belongs to one research post.
- `CONNECTS` is a recursive relationship from `RESEARCHER_PROFILE` back to itself.
- The schema diagram is the relational interpretation of the current E-R model, not an independent design.

---

## 1. System Overview

The Research Collaboration Platform supports researchers who create profiles, publish research, classify publications by research area, declare expertise, create research posts, receive applications, connect with other researchers, and receive notifications.

The platform also supports administrative review of a complete publication contribution. A contribution is not only a publication. It is the combined fact that:

1. A researcher contributed.
2. To a particular publication.
3. In a particular research area.

Because these three parts form one fact, the contribution is modeled as a ternary relationship. Because an administrator reviews that complete contribution occurrence, the contribution is modeled as an aggregation before it participates in `REVIEWS`.

The platform contains the following major functional areas:

| Functional area | Main objects |
|---|---|
| Researcher identity | `RESEARCHER_PROFILE`, `STUDENT_RESEARCHER`, `FACULTY_RESEARCHER` |
| Researcher contact and visibility | `RESEARCHER_CONTACT`, profile attributes, `profile_verified` |
| Publications | `PUBLICATION`, `PUBLICATION_CONTRIBUTION`, `CITATION_RECORD` |
| Research classification | `RESEARCH_AREA`, `EXPERTISE_AREA`, `RESEARCHER_EXPERTISE` |
| Review and verification | `ADMIN`, `PUBLICATION_REVIEW`, aggregated contribution |
| Recruitment and applications | `RESEARCHER_POST`, `APPLICATION`, `APPLIES_FOR`, `HAS_APPLICATION` |
| Social connections | `CONNECTS`, `CONNECTION` |
| Notifications | `NOTIFICATION`, `RECEIVES` |

---

## 2. Design Vocabulary

### 2.1 Entity

An entity represents an independently identifiable object in the system. Examples include a researcher profile, publication, research area, administrator, application, and post.

In the Chen E-R diagram, a strong entity is represented by a rectangle.

### 2.2 Strong entity

A strong entity has its own primary identifier. For example, `RESEARCHER_PROFILE` has `researcher_id`, and `PUBLICATION` has `publication_id`.

### 2.3 Weak entity

A weak entity cannot be uniquely identified by its own partial key alone. It depends on an owner entity and uses the owner's key together with its partial key.

`CITATION_RECORD` is weak because `citation_id` is only unique within the citations belonging to one publication. Its relational primary key is:

```text
```

### 2.4 Attribute

An attribute describes an entity or relationship.

Examples:

- `email` describes a researcher profile.
- `doi` describes a publication.
- `review_status` describes a review.
- `author_order` describes a contribution relationship.

### 2.5 Key attribute

A key attribute identifies an entity. It is underlined in the conceptual diagram and marked `PK` in the relational schema.

### 2.6 Partial key

A partial key identifies a weak entity only within the context of its owner. `citation_id` is the partial key of `CITATION_RECORD`.

### 2.7 Composite attribute

A composite attribute is logically one attribute made of smaller attributes. `full_name` is modeled as:

```text
full_name
├── first_name
└── last_name
```

The relational schema stores `first_name` and `last_name` as columns. It does not need a separate `full_name` column.

### 2.8 Multivalued attribute

A multivalued attribute can have more than one value for one entity. `contact_info` is multivalued because a researcher can have multiple contact values.

The relational mapping is the separate `RESEARCHER_CONTACT` table.

### 2.9 Derived attribute

A derived attribute is calculated from stored data rather than independently stored. `publication_count` is derived from contribution rows and should be calculated from `PUBLICATION_CONTRIBUTION`.

### 2.10 Relationship

A relationship describes an association between entities. Examples include:

- `RECEIVES` between `NOTIFICATION` and `RESEARCHER_PROFILE`.
- `CREATES` between `RESEARCHER_PROFILE` and `RESEARCHER_POST`.
- `APPLIES_FOR` between `RESEARCHER_PROFILE` and `APPLICATION`.
- `HAS_APPLICATION` between `RESEARCHER_POST` and `APPLICATION`.

In Chen notation, a relationship is represented by a diamond.

### 2.11 Cardinality

Cardinality describes how many instances of one entity may participate in a relationship with another entity.

The common cardinalities are:

- `1:1`: one entity instance relates to at most one instance on the other side.
- `1:N`: one entity instance relates to many instances on the other side.
- `M:N`: many instances relate to many instances.
- `N` on all three legs: a ternary many-to-many-to-many relationship.

### 2.12 Participation

Participation describes whether participation is optional or mandatory.

The current diagrams emphasize cardinality and the required classroom constructs. A production database should make optional versus mandatory participation explicit using `NOT NULL`, foreign keys, and application rules.

---

## 3. Conceptual E-R Model

The conceptual model contains:

- A researcher supertype.
- Student and faculty researcher subtypes.
- Notification and expertise relationships.
- Publications and research areas.
- A ternary contribution relationship.
- An aggregation for administrative review.
- A weak citation record.
- Research posts and applications.
- A recursive researcher connection relationship.

### 3.1 Main entity map

```text
RESEARCHER_PROFILE
├── STUDENT_RESEARCHER
└── FACULTY_RESEARCHER

RESEARCHER_PROFILE -- RECEIVES --> NOTIFICATION
RESEARCHER_PROFILE -- HAS_EXPERTISE --> EXPERTISE_AREA

RESEARCHER_PROFILE
        \
         CONTRIBUTES_TO [researcher, publication, research area]
        /                    \
PUBLICATION             RESEARCH_AREA

(RESEARCHER_PROFILE, PUBLICATION, RESEARCH_AREA, CONTRIBUTES_TO occurrence)
                              \
                               REVIEWS <-- ADMIN

PUBLICATION -- HAS_CITATION --> CITATION_RECORD

RESEARCHER_PROFILE -- CREATES --> RESEARCHER_POST
RESEARCHER_PROFILE -- APPLIES_FOR --> APPLICATION
RESEARCHER_POST -- HAS_APPLICATION --> APPLICATION

RESEARCHER_PROFILE -- CONNECTS -- RESEARCHER_PROFILE
        requester/sender       recipient/receiver
```

---

## 4. Entity and Attribute Dictionary

This section describes every entity and every attribute in the current conceptual model.

## 4.1 RESEARCHER_PROFILE

`RESEARCHER_PROFILE` is the central supertype entity. It stores the common identity, authentication, profile, visibility, and status information for every researcher.

### Attributes

| Attribute | Type in E-R model | Key/status | Description |
|---|---|---|---|
| `researcher_id` | Simple | Primary key | Unique identifier of a researcher profile. |
| `email` | Simple | Candidate key in practice | Login or contact email. A unique constraint is recommended. |
| `password_hash` | Simple | Sensitive | Secure password hash. Plain passwords must never be stored. |
| `role` | Simple | Domain value | Application role or access classification. |
| `status_on_off` | Simple | Domain value | Profile or account availability state. |
| `created_at` | Simple | Audit attribute | Timestamp when the profile was created. |
| `contact_info` | Multivalued | Mapped to a separate table | One researcher may have multiple contact values. |
| `full_name` | Composite | Decomposed | Logical name attribute composed of `first_name` and `last_name`. |
| `first_name` | Component of `full_name` | Normal column | Researcher's given name. |
| `last_name` | Component of `full_name` | Normal column | Researcher's family name. |
| `profile_verified` | Simple | Verification state | Indicates the current result of administrative profile review. |
| `profile_picture` | Simple | Optional | URL, storage key, or reference to a profile image. |
| `research_interest` | Simple | Optional | Free text or summary of the researcher's interests. |
| `google_scholar_link` | Simple | Optional | Link to a Google Scholar profile. |
| `orcid_id` | Simple | Optional candidate key | ORCID identifier if provided. A uniqueness constraint is recommended. |
| `personal_website` | Simple | Optional | Personal or professional website URL. |
| `visibility_pub_pri` | Simple | Domain value | Whether the profile is public or private. |
| `university_name` | Simple | Optional | University associated with the researcher. |
| `institution` | Simple | Optional | Institution associated with the researcher. This is the current replacement for the removed `country` field. |
| `publication_count` | Derived | Not stored | Number of relevant contribution rows derived from `PUBLICATION_CONTRIBUTION`. |

### Important profile rules

1. `researcher_id` uniquely identifies the profile.
2. `full_name` is represented logically, but the relational schema stores `first_name` and `last_name` separately.
3. `contact_info` is not stored as a comma-separated value. It is mapped to `RESEARCHER_CONTACT`.
4. `publication_count` is not stored as a normal column in the schema.
5. `profile_verified` is updated from the administrative review result.
6. `country` is not part of the current model.
7. `institution` is part of the current model.

## 4.2 STUDENT_RESEARCHER

`STUDENT_RESEARCHER` is a subtype of `RESEARCHER_PROFILE`.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `researcher_id` | Primary key and foreign key | Same identifier as the supertype profile. |
| `student_no` | Normal subtype attribute | Student identification number. |
| `degree_program` | Normal subtype attribute | Degree or academic program of the student researcher. |

The E-R diagram displays `student_no` and `degree_program` as attributes outside the subtype rectangle.

## 4.3 FACULTY_RESEARCHER

`FACULTY_RESEARCHER` is a subtype of `RESEARCHER_PROFILE`.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `researcher_id` | Primary key and foreign key | Same identifier as the supertype profile. |
| `designation` | Normal subtype attribute | Academic or professional designation of the faculty researcher. |

The current model intentionally does not include `faculty_rank` or `office_room` in this subtype.

## 4.4 NOTIFICATION

`NOTIFICATION` represents a message or system event delivered to a researcher.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `notification_id` | Primary key | Unique notification identifier. |
| `created_at` | Normal attribute | Time when the notification was created. |
| `message` | Normal attribute | Notification content. |
| `notification_type` | Domain attribute | Category of notification. |
| `is_read` | Boolean/status attribute | Whether the researcher has read the notification. |

The recipient researcher is represented through the `RECEIVES` relationship and becomes `researcher_id` as a foreign key in the relational schema.

## 4.5 EXPERTISE_AREA

`EXPERTISE_AREA` stores a reusable skill or expertise category.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `expertise_area_id` | Primary key | Unique expertise-area identifier. |
| `expertise_area_name` | Candidate key in practice | Human-readable expertise name. A uniqueness constraint is recommended. |

## 4.6 RESEARCH_AREA

`RESEARCH_AREA` represents a subject, discipline, or area in which a publication contribution is classified.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `research_area_id` | Primary key | Unique research-area identifier. |
| `research_area_name` | Candidate key in practice | Name of the research area. |
| `description` | Normal attribute | Explanation of the area. |

The current conceptual diagram places these attributes outside the entity rectangle.

## 4.7 PUBLICATION

`PUBLICATION` represents a research publication.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `publication_id` | Primary key | Unique publication identifier. |
| `doi` | Candidate key in practice | Digital Object Identifier when available. A uniqueness constraint is recommended for non-null DOI values. |
| `title` | Normal attribute | Publication title. |
| `abstract` | Normal attribute | Publication abstract or summary. |

The current corrected model does not store `citation_count` in `PUBLICATION`.

## 4.8 ADMIN

`ADMIN` represents a platform administrator who reviews an aggregated contribution occurrence.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `admin_id` | Primary key | Unique administrator identifier. |

The current model intentionally keeps `ADMIN` minimal. Administrative authentication and authorization details can be implemented separately if required by the application.

## 4.9 CITATION_RECORD

`CITATION_RECORD` is a weak entity owned by `PUBLICATION`.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `citation_id` | Partial key | Identifies a citation record only within one publication. |
| `citation_year` | Normal attribute | Year represented by the citation snapshot. It is not the partial key. |
| `citation_count` | Normal attribute | Citation count recorded for the snapshot. |

The owner relationship supplies `publication_id`. The relational primary key is:

```text
(publication_id, citation_id)
```

The current E-R relationship is displayed as `HAS_CITATION`. The relationship connects `PUBLICATION` to the weak `CITATION_RECORD` entity.

## 4.10 RESEARCHER_POST

`RESEARCHER_POST` represents an opportunity or collaboration request created by a researcher.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `post_id` | Primary key | Unique post identifier. |
| `title` | Normal attribute | Title of the opportunity or request. |
| `deadline` | Normal/date attribute | Deadline associated with the post. |
| `role_type` | Normal/domain attribute | Type of role being requested. |
| `required_skill` | Normal attribute | Skill expected from applicants. |

The creating researcher is represented by `CREATES` and becomes `posted_by_researcher_id` in the relational schema.

## 4.11 APPLICATION

`APPLICATION` represents an application submitted by a researcher in response to a research post or opportunity.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `application_id` | Primary key | Unique application identifier. |
| `applicant_researcher_id` | Foreign key | Researcher who submitted the application. |
| `post_id` | Foreign key | Research post targeted by the application. |
| `application_status` | Domain/status attribute | Current application state. |
| `applied_at` | Date/time attribute | Time when the application was submitted. |
| `motivation_message` | Normal attribute | Applicant's explanation or motivation. |

In the corrected E-R design, these attributes are connected to the `APPLICATION` entity. They are not attributes of the `APPLIES_FOR` diamond.

Each application belongs to one applicant and one research post. `applicant_researcher_id` implements the researcher-to-application `APPLIES_FOR` relationship, while `post_id` implements the post-to-application `HAS_APPLICATION` relationship.

The ER diagram shows two separate paths into `APPLICATION`:

```text
RESEARCHER_PROFILE (1) -- APPLIES_FOR -- (N) APPLICATION
RESEARCHER_POST    (1) -- HAS_APPLICATION -- (N) APPLICATION
```

The `APPLIES_FOR` connector runs from the `RESEARCHER_PROFILE` entity edge to the `APPLIES_FOR` diamond and then to the `APPLICATION` entity edge. The `HAS_APPLICATION` connector runs independently from `RESEARCHER_POST` to its own diamond and then to `APPLICATION`. They share the application entity, but they are not the same relationship.

## 4.12 CONNECTION

`CONNECTION` is the relational table produced from the recursive `CONNECTS` relationship.

### Attributes

| Attribute | Key/status | Description |
|---|---|---|
| `connection_id` | Primary key | Unique connection identifier. |
| `sender_researcher_id` | Foreign key | First researcher role: requester or sender. |
| `receiver_researcher_id` | Foreign key | Second researcher role: recipient or receiver. |
| `relation_type` | Domain attribute | Type of connection. |
| `status` | Domain/status attribute | Pending, accepted, rejected, blocked, or another defined state. |
| `created_at` | Audit attribute | Time when the connection request or record was created. |

Both researcher foreign keys reference `RESEARCHER_PROFILE(researcher_id)`, but they have different role meanings.

---

## 5. Relationships and Cardinalities

## 5.1 ISA specialization

The `ISA` triangle represents specialization of the `RESEARCHER_PROFILE` supertype into two subtypes:

```text
                 RESEARCHER_PROFILE
                         |
                         ISA
                       /     \
       STUDENT_RESEARCHER   FACULTY_RESEARCHER
```

The current specialization is:

- Total: every researcher profile belongs to a subtype according to the intended model.
- Disjoint: one profile should not simultaneously be both a student researcher and a faculty researcher under the current rule.

### Relational mapping

The supertype-subtype mapping uses one table for the supertype and one table for each subtype:

```text
RESEARCHER_PROFILE(researcher_id PK, ...)
STUDENT_RESEARCHER(researcher_id PK/FK, student_no, degree_program)
FACULTY_RESEARCHER(researcher_id PK/FK, designation)
```

The subtype primary key is also a foreign key to the supertype primary key. This is the standard table-per-subtype mapping.

### Specialization constraints

Recommended database/application rules:

1. A subtype row cannot exist without a matching `RESEARCHER_PROFILE` row.
2. A profile cannot have both subtype rows when disjointness is enforced.
3. A profile should have one subtype row when total participation is enforced.
4. Subtype creation should occur in the same transaction as profile creation when the business rule requires immediate classification.

## 5.2 RECEIVES

`RECEIVES` connects `NOTIFICATION` to `RESEARCHER_PROFILE`.

Conceptually:

```text
NOTIFICATION -- RECEIVES --> RESEARCHER_PROFILE
```

Meaning:

- A notification is delivered to a researcher.
- One researcher can receive many notifications.
- Each notification should have one intended recipient.

Relational mapping:

```text
NOTIFICATION(
    notification_id PK,
    researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    created_at,
    message,
    notification_type,
    is_read
)
```

The foreign key can be `NOT NULL` if every notification must have a recipient.

## 5.3 HAS_EXPERTISE

`HAS_EXPERTISE` connects a researcher profile to an expertise area.

Conceptually:

```text
RESEARCHER_PROFILE -- HAS_EXPERTISE --> EXPERTISE_AREA
```

Meaning:

- A researcher can have multiple expertise areas.
- An expertise area can be associated with multiple researchers.
- The relational design represents this as a many-to-many association.

Relational mapping:

```text
RESEARCHER_EXPERTISE(
    researcher_id PK/FK -> RESEARCHER_PROFILE.researcher_id,
    expertise_area_id PK/FK -> EXPERTISE_AREA.expertise_area_id,
    proficiency_level
)
```

The composite key prevents the same researcher-expertise pair from being duplicated.

## 5.4 CONTRIBUTES_TO ternary relationship

`CONTRIBUTES_TO` is a ternary relationship between:

- `RESEARCHER_PROFILE`.
- `PUBLICATION`.
- `RESEARCH_AREA`.

It represents one complete contribution fact:

```text
researcher X contributed to publication Y in research area Z
```

The relationship attributes are:

| Attribute | Description |
|---|---|
| `author_order` | Position of the researcher in the publication's author list. |
| `contribution_role` | Contribution role, such as author, editor, reviewer, or another controlled value. |

### Why the relationship is ternary

The research area is part of the contribution fact. Splitting this into unrelated binary relationships would lose the exact connection between the researcher, publication, and area.

For example, these three independent facts would not be enough to identify one contribution occurrence:

```text
Researcher contributes to Publication
Researcher belongs to Research Area
Publication belongs to Research Area
```

The ternary relation keeps the three keys together in one row.

### Relational mapping

```text
PUBLICATION_CONTRIBUTION(
    researcher_id PK/FK -> RESEARCHER_PROFILE.researcher_id,
    publication_id PK/FK -> PUBLICATION.publication_id,
    research_area_id PK/FK -> RESEARCH_AREA.research_area_id,
    author_order,
    contribution_role,
    PRIMARY KEY (researcher_id, publication_id, research_area_id)
)
```

The composite primary key means that the same researcher cannot be registered twice for the same publication and research area combination.

## 5.5 Aggregation and REVIEWS

The aggregate is the exact occurrence of `CONTRIBUTES_TO`:

```text
RESEARCHER_PROFILE + PUBLICATION + RESEARCH_AREA
                    through one CONTRIBUTES_TO occurrence
```

That aggregate participates in `REVIEWS` with `ADMIN`.

Conceptually:

```text
ADMIN -- REVIEWS --> aggregated contribution occurrence
```

The `REVIEWS` relationship has:

| Attribute | Description |
|---|---|
| `review_status` | Result of the administrative review. |
| `reviewed_at` | Time when the review was made or updated. |

The current model does not use `review_id`.

### Relational mapping

```text
PUBLICATION_REVIEW(
    admin_id FK -> ADMIN.admin_id,
    contributor_id FK,
    publication_id FK,
    research_area_id FK,
    review_status,
    reviewed_at,
    FOREIGN KEY (
        contributor_id,
        publication_id,
        research_area_id
    ) REFERENCES PUBLICATION_CONTRIBUTION(
        researcher_id,
        publication_id,
        research_area_id
    )
)
```

The current conceptual diagram describes the contribution occurrence as the thing being reviewed. The relational table preserves that exact occurrence through the three-part foreign key.

### Profile verification rule

`review_status` drives `RESEARCHER_PROFILE.profile_verified`.

Conceptual rule:

```text
if review_status = 'verified'
    profile_verified = true or 'verified'
else
    profile_verified = false or 'not verified'
```

The exact storage type can be Boolean, an enumerated state, or a status code. The important rule is that the profile verification state reflects the latest authoritative administrative review.

Recommended implementation behavior:

1. Start a transaction.
2. Insert or update the `PUBLICATION_REVIEW` row.
3. Update the related `RESEARCHER_PROFILE.profile_verified` value.
4. Store the review timestamp.
5. Commit both changes together.

## 5.6 HAS_CITATION and weak entity ownership

`HAS_CITATION` connects `PUBLICATION` to the weak entity `CITATION_RECORD`.

Conceptually:

```text
PUBLICATION -- HAS_CITATION --> CITATION_RECORD
```

Meaning:

- A publication may have many citation history records.
- A citation record belongs to one publication.
- A citation record is not independently identifiable without its publication owner.

The partial key is `citation_id`. The complete relational identifier is:

```text
(publication_id, citation_id)
```

Relational mapping:

```text
CITATION_RECORD(
    publication_id PK/FK -> PUBLICATION.publication_id,
    citation_id PK partial key,
    citation_year,
    citation_count,
    PRIMARY KEY (publication_id, citation_id)
)
```

`citation_year` is not a partial key in the current model.

## 5.7 CREATES

`CREATES` connects a researcher profile to a researcher post.

Conceptually:

```text
RESEARCHER_PROFILE -- CREATES --> RESEARCHER_POST
```

Meaning:

- A researcher can create many posts.
- Each post has one creating researcher.

Relational mapping:

```text
RESEARCHER_POST(
    post_id PK,
    posted_by_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    title,
    deadline,
    role_type,
    required_skill
)
```

## 5.8 APPLIES_FOR

`APPLIES_FOR` connects `RESEARCHER_PROFILE` to `APPLICATION`.

Conceptually:

```text
RESEARCHER_PROFILE -- APPLIES_FOR --> APPLICATION
```

Meaning:

- A researcher can submit multiple applications.
- Each application has one applicant researcher.
- Application-specific attributes belong to `APPLICATION`.

Cardinality:

- One `RESEARCHER_PROFILE` can participate in many `APPLIES_FOR` instances.
- Each `APPLICATION` participates in exactly one `APPLIES_FOR` instance.

Relational mapping:

```text
APPLICATION(
    application_id PK,
    applicant_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    post_id FK -> RESEARCHER_POST.post_id,
    application_status,
    applied_at,
    motivation_message
)
```

The `applicant_researcher_id` foreign key implements `APPLIES_FOR`.

## 5.9 HAS_APPLICATION

`HAS_APPLICATION` connects `RESEARCHER_POST` to the same `APPLICATION` entity used by `APPLIES_FOR`.

Conceptually:

```text
RESEARCHER_POST -- HAS_APPLICATION --> APPLICATION
```

Meaning:

- One research post can have many applications.
- Each application belongs to one research post.
- The same application also belongs to one applicant researcher through `APPLIES_FOR`.
- Applications for a post can be found by filtering `APPLICATION.post_id`.

Cardinality:

- One `RESEARCHER_POST` can participate in many `HAS_APPLICATION` instances.
- Each `APPLICATION` participates in exactly one `HAS_APPLICATION` instance.

The `post_id` foreign key in `APPLICATION` implements this relationship.

## 5.10 CONNECTS recursive self-join

`CONNECTS` is a recursive relationship because both ends reference the same entity type: `RESEARCHER_PROFILE`.

The two roles must be named to avoid ambiguity:

```text
RESEARCHER_PROFILE
    requester / sender
          \
           CONNECTS
          /
    recipient / receiver
RESEARCHER_PROFILE
```

Relational mapping:

```text
CONNECTION(
    connection_id PK,
    sender_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    receiver_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    relation_type,
    status,
    created_at
)
```

Recommended constraints:

1. `sender_researcher_id` and `receiver_researcher_id` should both be non-null.
2. A researcher should not connect to themself unless self-connections are explicitly allowed.
3. Duplicate active connections should be prevented according to the product's direction rules.
4. If connections are undirected, the application should canonicalize the pair or enforce a unique unordered pair.
5. `status` should use a controlled domain such as `pending`, `accepted`, `rejected`, or `blocked`.

---

## 6. Relational Schema Dictionary

This section lists the current relational tables and their columns exactly as represented by the schema diagram.

## 6.1 RESEARCHER_PROFILE table

```text
RESEARCHER_PROFILE(
    researcher_id PK,
    email,
    password_hash,
    role,
    status_on_off,
    created_at,
    first_name,
    last_name,
    profile_verified,
    profile_picture,
    research_interest,
    google_scholar_link,
    orcid_id,
    personal_website,
    visibility_pub_pri,
    university_name,
    institution
)
```

Notes:

- `researcher_id` is the primary key.
- `first_name` and `last_name` are the relational representation of `full_name`.
- `profile_verified` stores or reflects administrative verification.
- `country` is intentionally absent.
- `institution` is present.
- `contact_info` is mapped to `RESEARCHER_CONTACT`, not stored as a repeated value in this table.
- `publication_count` is derived and intentionally absent from the physical table.

## 6.2 STUDENT_RESEARCHER table

```text
STUDENT_RESEARCHER(
    researcher_id PK/FK -> RESEARCHER_PROFILE.researcher_id,
    student_no,
    degree_program
)
```

The subtype uses the same identifier as its supertype row.

## 6.3 FACULTY_RESEARCHER table

```text
FACULTY_RESEARCHER(
    researcher_id PK/FK -> RESEARCHER_PROFILE.researcher_id,
    designation
)
```

The current subtype has no `faculty_rank` or `office_room` columns.

## 6.4 RESEARCH_AREA table

```text
RESEARCH_AREA(
    research_area_id PK,
    research_area_name,
    description
)
```

## 6.5 EXPERTISE_AREA table

```text
EXPERTISE_AREA(
    expertise_area_id PK,
    expertise_area_name
)
```

## 6.6 ADMIN table

```text
ADMIN(
    admin_id PK
)
```

## 6.7 NOTIFICATION table

```text
NOTIFICATION(
    notification_id PK,
    researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    created_at,
    message,
    notification_type,
    is_read
)
```

The `researcher_id` column is the relational implementation of `RECEIVES`.

## 6.8 RESEARCHER_CONTACT table

```text
RESEARCHER_CONTACT(
    researcher_id PK/FK -> RESEARCHER_PROFILE.researcher_id,
    contact_info PK,
    PRIMARY KEY (researcher_id, contact_info)
)
```

This table maps the multivalued `contact_info` attribute.

## 6.9 RESEARCHER_EXPERTISE table

```text
RESEARCHER_EXPERTISE(
    researcher_id PK/FK -> RESEARCHER_PROFILE.researcher_id,
    expertise_area_id PK/FK -> EXPERTISE_AREA.expertise_area_id,
    proficiency_level,
    PRIMARY KEY (researcher_id, expertise_area_id)
)
```

## 6.10 PUBLICATION table

```text
PUBLICATION(
    publication_id PK,
    doi,
    title,
    abstract
)
```

The current table does not include `citation_count`, `topic_name`, `publication_year`, `publication_type`, `journal_or_conference`, `paper_url`, or other older fields from previous iterations.

## 6.11 RESEARCHER_POST table

```text
RESEARCHER_POST(
    post_id PK,
    posted_by_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    title,
    deadline,
    role_type,
    required_skill
)
```

## 6.12 CITATION_RECORD table

```text
CITATION_RECORD(
    publication_id PK/FK -> PUBLICATION.publication_id,
    citation_id PK partial key,
    citation_year,
    citation_count,
    PRIMARY KEY (publication_id, citation_id)
)
```

## 6.13 PUBLICATION_CONTRIBUTION table

```text
PUBLICATION_CONTRIBUTION(
    researcher_id PK/FK -> RESEARCHER_PROFILE.researcher_id,
    publication_id PK/FK -> PUBLICATION.publication_id,
    research_area_id PK/FK -> RESEARCH_AREA.research_area_id,
    author_order,
    contribution_role,
    PRIMARY KEY (researcher_id, publication_id, research_area_id)
)
```

## 6.14 PUBLICATION_REVIEW table

```text
PUBLICATION_REVIEW(
    admin_id FK -> ADMIN.admin_id,
    contributor_id FK,
    publication_id FK,
    research_area_id FK,
    review_status,
    reviewed_at,
    FOREIGN KEY (
        contributor_id,
        publication_id,
        research_area_id
    ) REFERENCES PUBLICATION_CONTRIBUTION(
        researcher_id,
        publication_id,
        research_area_id
    )
)
```

Important points:

- There is no `review_id` in the current table.
- The contribution foreign-key columns identify the exact contribution occurrence being reviewed.
- `admin_id` identifies the reviewing administrator.
- `review_status` and `reviewed_at` are attributes of the review.

## 6.15 APPLICATION table

```text
APPLICATION(
    application_id PK,
    applicant_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    post_id FK -> RESEARCHER_POST.post_id,
    application_status,
    applied_at,
    motivation_message
)
```

`applicant_researcher_id` implements `APPLIES_FOR`. `post_id` implements `HAS_APPLICATION`. This allows all applications for a post to be found directly and ensures every application identifies its applicant and target post.

The schema connectors for these two foreign keys are:

```text
APPLICATION.applicant_researcher_id -> RESEARCHER_PROFILE.researcher_id
APPLICATION.post_id                 -> RESEARCHER_POST.post_id
```

They are direct foreign-key paths. There is no `APPLIES_FOR` bridge table and no separate `HAS_APPLICATION` bridge table.

## 6.16 CONNECTION table

```text
CONNECTION(
    connection_id PK,
    sender_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    receiver_researcher_id FK -> RESEARCHER_PROFILE.researcher_id,
    relation_type,
    status,
    created_at
)
```

---

## 7. Primary Keys and Foreign Keys

## 7.1 Primary key list

| Table | Primary key |
|---|---|
| `RESEARCHER_PROFILE` | `researcher_id` |
| `STUDENT_RESEARCHER` | `researcher_id` |
| `FACULTY_RESEARCHER` | `researcher_id` |
| `RESEARCH_AREA` | `research_area_id` |
| `EXPERTISE_AREA` | `expertise_area_id` |
| `ADMIN` | `admin_id` |
| `NOTIFICATION` | `notification_id` |
| `RESEARCHER_CONTACT` | `(researcher_id, contact_info)` |
| `RESEARCHER_EXPERTISE` | `(researcher_id, expertise_area_id)` |
| `PUBLICATION` | `publication_id` |
| `RESEARCHER_POST` | `post_id` |
| `CITATION_RECORD` | `(publication_id, citation_id)` |
| `PUBLICATION_CONTRIBUTION` | `(researcher_id, publication_id, research_area_id)` |
| `PUBLICATION_REVIEW` | No standalone `review_id` in the current model; identity should be governed by the contribution occurrence and review policy. |
| `APPLICATION` | `application_id` |
| `CONNECTION` | `connection_id` |

## 7.2 Foreign key list

| Table | Foreign key | References |
|---|---|---|
| `STUDENT_RESEARCHER` | `researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `FACULTY_RESEARCHER` | `researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `NOTIFICATION` | `researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `RESEARCHER_CONTACT` | `researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `RESEARCHER_EXPERTISE` | `researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `RESEARCHER_EXPERTISE` | `expertise_area_id` | `EXPERTISE_AREA(expertise_area_id)` |
| `RESEARCHER_POST` | `posted_by_researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `CITATION_RECORD` | `publication_id` | `PUBLICATION(publication_id)` |
| `PUBLICATION_CONTRIBUTION` | `researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `PUBLICATION_CONTRIBUTION` | `publication_id` | `PUBLICATION(publication_id)` |
| `PUBLICATION_CONTRIBUTION` | `research_area_id` | `RESEARCH_AREA(research_area_id)` |
| `PUBLICATION_REVIEW` | `admin_id` | `ADMIN(admin_id)` |
| `PUBLICATION_REVIEW` | `(contributor_id, publication_id, research_area_id)` | `PUBLICATION_CONTRIBUTION(researcher_id, publication_id, research_area_id)` |
| `APPLICATION` | `applicant_researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `APPLICATION` | `post_id` | `RESEARCHER_POST(post_id)` |
| `CONNECTION` | `sender_researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |
| `CONNECTION` | `receiver_researcher_id` | `RESEARCHER_PROFILE(researcher_id)` |

---

## 8. Complete Relationship-to-Table Mapping

| E-R object | Relational implementation |
|---|---|
| `ISA` specialization | `RESEARCHER_PROFILE`, `STUDENT_RESEARCHER`, `FACULTY_RESEARCHER` with shared PK/FK |
| `RECEIVES` | `NOTIFICATION.researcher_id` |
| `HAS_EXPERTISE` | `RESEARCHER_EXPERTISE` bridge table |
| `CONTRIBUTES_TO` | `PUBLICATION_CONTRIBUTION` ternary table |
| Aggregated contribution | Three-part contribution key referenced by `PUBLICATION_REVIEW` |
| `REVIEWS` | `PUBLICATION_REVIEW` with `admin_id`, review attributes, and contribution FK |
| `HAS_CITATION` | `CITATION_RECORD.publication_id` plus weak-entity composite key |
| Multivalued `contact_info` | `RESEARCHER_CONTACT` |
| `CREATES` | `RESEARCHER_POST.posted_by_researcher_id` |
| `APPLIES_FOR` | `APPLICATION.applicant_researcher_id` |
| `HAS_APPLICATION` | `APPLICATION.post_id` |
| `CONNECTS` | `CONNECTION` with two FKs to the same researcher table |

---

## 9. Joins and How the Tables Connect

## 9.1 Researcher profile with student subtype

```sql
SELECT rp.researcher_id,
       rp.first_name,
       rp.last_name,
       sr.student_no,
       sr.degree_program
FROM RESEARCHER_PROFILE AS rp
JOIN STUDENT_RESEARCHER AS sr
  ON sr.researcher_id = rp.researcher_id;
```

## 9.2 Researcher profile with faculty subtype

```sql
SELECT rp.researcher_id,
       rp.first_name,
       rp.last_name,
       fr.designation
FROM RESEARCHER_PROFILE AS rp
JOIN FACULTY_RESEARCHER AS fr
  ON fr.researcher_id = rp.researcher_id;
```

## 9.3 Researcher and notifications

```sql
SELECT rp.researcher_id,
       rp.first_name,
       rp.last_name,
       n.notification_id,
       n.message,
       n.is_read,
       n.created_at
FROM RESEARCHER_PROFILE AS rp
JOIN NOTIFICATION AS n
  ON n.researcher_id = rp.researcher_id
ORDER BY n.created_at DESC;
```

## 9.4 Researcher and expertise areas

```sql
SELECT rp.researcher_id,
       rp.first_name,
       rp.last_name,
       ea.expertise_area_name,
       re.proficiency_level
FROM RESEARCHER_PROFILE AS rp
JOIN RESEARCHER_EXPERTISE AS re
  ON re.researcher_id = rp.researcher_id
JOIN EXPERTISE_AREA AS ea
  ON ea.expertise_area_id = re.expertise_area_id;
```

## 9.5 Publication contributions

```sql
SELECT pc.researcher_id,
       rp.first_name,
       rp.last_name,
       pc.publication_id,
       p.title,
       ra.research_area_name,
       pc.author_order,
       pc.contribution_role
FROM PUBLICATION_CONTRIBUTION AS pc
JOIN RESEARCHER_PROFILE AS rp
  ON rp.researcher_id = pc.researcher_id
JOIN PUBLICATION AS p
  ON p.publication_id = pc.publication_id
JOIN RESEARCH_AREA AS ra
  ON ra.research_area_id = pc.research_area_id;
```

## 9.6 Derived publication count

```sql
SELECT rp.researcher_id,
       rp.first_name,
       rp.last_name,
       COUNT(pc.publication_id) AS publication_count
FROM RESEARCHER_PROFILE AS rp
LEFT JOIN PUBLICATION_CONTRIBUTION AS pc
  ON pc.researcher_id = rp.researcher_id
GROUP BY rp.researcher_id,
         rp.first_name,
         rp.last_name;
```

The `LEFT JOIN` ensures that a researcher with no contribution rows still appears with a count of zero.

## 9.7 Citation history for a publication

```sql
SELECT p.publication_id,
       p.title,
       cr.citation_id,
       cr.citation_year,
       cr.citation_count
FROM PUBLICATION AS p
JOIN CITATION_RECORD AS cr
  ON cr.publication_id = p.publication_id
WHERE p.publication_id = :publication_id
ORDER BY cr.citation_year;
```

## 9.8 Administrative review with the exact contribution

```sql
SELECT pr.admin_id,
       pr.review_status,
       pr.reviewed_at,
       pr.contributor_id,
       rp.first_name,
       rp.last_name,
       pr.publication_id,
       p.title,
       pr.research_area_id,
       ra.research_area_name
FROM PUBLICATION_REVIEW AS pr
JOIN ADMIN AS a
  ON a.admin_id = pr.admin_id
JOIN PUBLICATION_CONTRIBUTION AS pc
  ON pc.researcher_id = pr.contributor_id
 AND pc.publication_id = pr.publication_id
 AND pc.research_area_id = pr.research_area_id
JOIN RESEARCHER_PROFILE AS rp
  ON rp.researcher_id = pc.researcher_id
JOIN PUBLICATION AS p
  ON p.publication_id = pc.publication_id
JOIN RESEARCH_AREA AS ra
  ON ra.research_area_id = pc.research_area_id;
```

## 9.9 Researcher applications

```sql
SELECT rp.researcher_id,
       rp.first_name,
       rp.last_name,
       a.application_id,
       a.application_status,
       a.applied_at,
       a.motivation_message
FROM RESEARCHER_PROFILE AS rp
JOIN APPLICATION AS a
  ON a.applicant_researcher_id = rp.researcher_id;
```

## 9.10 Applications for a research post

```sql
SELECT post.post_id,
       post.title AS post_title,
       a.application_id,
       a.application_status,
       a.applied_at,
       a.motivation_message,
       applicant.researcher_id AS applicant_id,
       applicant.first_name,
       applicant.last_name
FROM RESEARCHER_POST AS post
JOIN APPLICATION AS a
  ON a.post_id = post.post_id
JOIN RESEARCHER_PROFILE AS applicant
  ON applicant.researcher_id = a.applicant_researcher_id
WHERE post.post_id = :post_id
ORDER BY a.applied_at DESC;
```

This is the main query used to find every application submitted for one research post.

## 9.11 Researcher connections with role names

```sql
SELECT c.connection_id,
       c.status,
       sender.researcher_id AS sender_id,
       sender.first_name AS sender_first_name,
       sender.last_name AS sender_last_name,
       receiver.researcher_id AS receiver_id,
       receiver.first_name AS receiver_first_name,
       receiver.last_name AS receiver_last_name
FROM CONNECTION AS c
JOIN RESEARCHER_PROFILE AS sender
  ON sender.researcher_id = c.sender_researcher_id
JOIN RESEARCHER_PROFILE AS receiver
  ON receiver.researcher_id = c.receiver_researcher_id;
```

The same table is joined twice because the relationship is recursive.

---

## 10. Recommended SQL Data Types

The diagrams intentionally focus on logical design. A physical implementation should choose types based on the selected database engine. The following types are a reasonable PostgreSQL-style recommendation.

| Column category | Recommended type |
|---|---|
| Numeric identifiers | `BIGINT` or `UUID` |
| Names and short labels | `VARCHAR(150)` |
| Email | `VARCHAR(320)` |
| Password hash | `TEXT` or `VARCHAR(255)` |
| Long text | `TEXT` |
| URLs | `TEXT` or constrained `VARCHAR` |
| Boolean state | `BOOLEAN` |
| Status values | `VARCHAR` with a `CHECK`, or a database enum |
| Timestamps | `TIMESTAMPTZ` |
| Dates | `DATE` |
| Author order | `INTEGER` |
| Citation count | `INTEGER` or `BIGINT` |

Example conceptual type assignment:

```text
researcher_id       BIGINT or UUID
student_no          VARCHAR(50)
degree_program      VARCHAR(150)
designation         VARCHAR(150)
email               VARCHAR(320)
password_hash       TEXT
created_at          TIMESTAMPTZ
profile_verified    BOOLEAN
publication_id      BIGINT or UUID
title               TEXT
abstract            TEXT
research_area_id    BIGINT or UUID
admin_id            BIGINT or UUID
application_id      BIGINT or UUID
connection_id       BIGINT or UUID
```

The exact identifier strategy should be selected once and used consistently across every related table.

---

## 11. Recommended Integrity Constraints

## 11.1 Entity integrity

Every primary key must be:

- Unique.
- Non-null.
- Stable after creation unless a controlled migration changes it.

## 11.2 Referential integrity

Every foreign key must reference an existing parent key. Recommended behavior:

- Reject deletion of a researcher with dependent records unless an explicit deletion policy exists.
- Use cascading deletes only for dependent subtype and bridge rows where data loss is expected and safe.
- Preserve publication and review history when legal, academic, or audit requirements demand retention.

## 11.3 Profile constraints

Recommended rules:

```text
email IS NOT NULL
email is unique
password_hash IS NOT NULL
profile_verified is a valid Boolean or status value
visibility_pub_pri is one of the supported visibility states
status_on_off is one of the supported profile states
```

## 11.4 Specialization constraints

For total and disjoint specialization:

```text
Each RESEARCHER_PROFILE has exactly one subtype row.
No researcher_id appears in both STUDENT_RESEARCHER and FACULTY_RESEARCHER.
```

This is commonly enforced through application logic, a trigger, or a type discriminator in the supertype combined with subtype foreign keys.

## 11.5 Publication constraints

Recommended rules:

```text
title IS NOT NULL
publication_id is unique
doi is unique when not null
```

## 11.6 Contribution constraints

Recommended rules:

```text
author_order > 0 when supplied
researcher_id exists
publication_id exists
research_area_id exists
the three-key combination is unique
```

## 11.7 Citation constraints

Recommended rules:

```text
publication_id IS NOT NULL
citation_id IS NOT NULL
citation_year is a valid year
citation_count >= 0
(publication_id, citation_id) is unique
```

## 11.8 Review constraints

Recommended rules:

```text
admin_id exists
the contribution key exists in PUBLICATION_CONTRIBUTION
review_status is from a controlled status set
reviewed_at is set when review_status is set
profile_verified reflects the latest authoritative review
```

Because the current design intentionally removes `review_id`, a production implementation must decide whether multiple historical reviews are allowed for one contribution. If review history is required, the schema needs a different composite identity, such as a review version or timestamp, without reintroducing the removed column under a conflicting meaning.

## 11.9 Application constraints

Recommended rules:

```text
application_id is unique
applicant_researcher_id exists
post_id exists
application_status is controlled
applied_at is not null for submitted applications
motivation_message may be required depending on application status
```

## 11.10 Connection constraints

Recommended rules:

```text
sender_researcher_id exists
receiver_researcher_id exists
sender_researcher_id <> receiver_researcher_id unless self-links are allowed
status is controlled
```

---

## 12. Normalization Analysis

The design follows the main goals of relational normalization.

## 12.1 First normal form

The design avoids repeating groups and multi-valued cells:

- Multiple contact values are stored in `RESEARCHER_CONTACT`.
- Multiple expertise values are stored in `RESEARCHER_EXPERTISE`.
- Multiple contribution facts are stored in `PUBLICATION_CONTRIBUTION`.
- Multiple citation snapshots are stored in `CITATION_RECORD`.

Each table row represents one logical fact, and each column should hold one atomic value.

## 12.2 Second normal form

Tables with composite keys keep non-key attributes dependent on the complete key:

- `RESEARCHER_CONTACT` has no non-key attributes.
- `RESEARCHER_EXPERTISE.proficiency_level` depends on the researcher-expertise pair.
- `APPLICATION` stores the applicant and post foreign keys with the application-specific attributes.
- `PUBLICATION_CONTRIBUTION.author_order` and `contribution_role` depend on the complete researcher-publication-area combination.
- `CITATION_RECORD.citation_year` and `citation_count` belong to the publication-citation pair.

## 12.3 Third normal form

The design separates independent concepts:

- Researcher identity is separate from expertise.
- Research areas are separate from publications.
- Applications are separate from the researcher-application relationship.
- Administrative review is separate from the contribution occurrence.
- Citation history is separate from publication identity.

The derived `publication_count` is not stored as a redundant value, reducing update anomalies.

---

## 13. Recommended Indexes

Primary keys automatically provide indexes in most relational database systems. Additional indexes are recommended for foreign keys and frequent filters.

```text
RESEARCHER_PROFILE(email)
RESEARCHER_PROFILE(orcid_id)
NOTIFICATION(researcher_id, created_at)
RESEARCHER_CONTACT(researcher_id)
APPLICATION(applicant_researcher_id)
APPLICATION(post_id)
RESEARCHER_EXPERTISE(researcher_id)
RESEARCHER_EXPERTISE(expertise_area_id)
RESEARCHER_POST(posted_by_researcher_id)
RESEARCHER_POST(deadline)
CITATION_RECORD(publication_id, citation_year)
PUBLICATION_CONTRIBUTION(researcher_id)
PUBLICATION_CONTRIBUTION(publication_id)
PUBLICATION_CONTRIBUTION(research_area_id)
PUBLICATION_REVIEW(admin_id)
PUBLICATION_REVIEW(review_status)
CONNECTION(sender_researcher_id, status)
CONNECTION(receiver_researcher_id, status)
```

Indexes should be validated against real query workloads. Every index increases write cost and storage usage.

---

## 14. Security Design

## 14.1 Authentication data

- Store only a strong password hash.
- Never store plaintext passwords.
- Use a modern password hashing algorithm with a per-user salt.
- Limit access to `password_hash`.

## 14.2 Role authorization

The `role` attribute can support application-level authorization, but authorization should be enforced server-side.

Typical permissions include:

| Role | Typical permissions |
|---|---|
| Student researcher | Manage own profile, contributions, applications, and connections. |
| Faculty researcher | Manage own profile, contributions, posts, applications, and connections. |
| Administrator | Review contribution occurrences and update verification status. |

These permissions are conceptual. The production system should define them explicitly through an authorization layer.

## 14.3 Profile visibility

`visibility_pub_pri` should be enforced when returning profile data. A private profile should not be exposed through public search or public publication views unless the product policy allows it.

## 14.4 Sensitive profile fields

Potentially sensitive fields include:

- `email`.
- `password_hash`.
- `contact_info`.
- Private profile URLs.
- Internal review information.

These fields should use least-privilege access controls.

## 14.5 Review authorization

Only authorized administrators should be able to change `PUBLICATION_REVIEW.review_status` and consequently update `profile_verified`.

Every review change should be auditable with an administrator identifier and timestamp.

---

## 15. Main Business Workflows

## 15.1 Create a researcher profile

1. Insert a row into `RESEARCHER_PROFILE`.
2. Store `researcher_id`, email, password hash, role, status, name components, and visibility.
3. Create exactly one subtype row according to the specialization rule.
4. Insert contact values into `RESEARCHER_CONTACT` when supplied.
5. Set the initial `profile_verified` state to the system default.

## 15.2 Add expertise

1. Confirm that the expertise area exists.
2. Insert the researcher and expertise keys into `RESEARCHER_EXPERTISE`.
3. Optionally store `proficiency_level`.
4. Reject duplicate researcher-expertise pairs.

## 15.3 Add a publication contribution

1. Confirm that the researcher exists.
2. Confirm that the publication exists.
3. Confirm that the research area exists.
4. Insert one row into `PUBLICATION_CONTRIBUTION`.
5. Store `author_order` and `contribution_role` if required.
6. Recalculate derived publication counts when displayed.

## 15.4 Record citation history

1. Confirm that the publication exists.
2. Select a `citation_id` unique within that publication.
3. Insert `publication_id`, `citation_id`, `citation_year`, and `citation_count` into `CITATION_RECORD`.
4. Reject duplicate `(publication_id, citation_id)` pairs.

## 15.5 Review a contribution

1. Confirm that the administrator exists.
2. Confirm that the exact contribution composite key exists.
3. Insert or update the review row without a `review_id` column.
4. Set `review_status` and `reviewed_at`.
5. Update the contributor profile's `profile_verified` state.
6. Commit the review and profile update in one transaction.

## 15.6 Create a research post

1. Confirm that the researcher exists.
2. Insert a `RESEARCHER_POST` row.
3. Store `post_id`, title, deadline, role type, required skill, and creator foreign key.

## 15.7 Submit an application

1. Confirm that the applicant researcher exists.
2. Confirm that the target research post exists.
3. Insert one `APPLICATION` row with `applicant_researcher_id`, `post_id`, and the application attributes.
4. Update application status through controlled transitions.
5. Find applications for a post by filtering on `APPLICATION.post_id`.

## 15.8 Create a researcher connection

1. Confirm both sender and receiver profiles exist.
2. Reject self-connections unless allowed.
3. Insert the two role-based foreign keys into `CONNECTION`.
4. Set the initial status to `pending`.
5. Update status after the receiver accepts or rejects the request.

---

## 16. Status Domains

The diagrams show status attributes but do not prescribe the final value vocabulary. A production system should define controlled values.

### Suggested profile statuses

```text
active
inactive
suspended
archived
```

### Suggested visibility values

```text
public
private
```

### Suggested review statuses

```text
pending
verified
not_verified
rejected
needs_revision
```

### Suggested application statuses

```text
draft
submitted
under_review
accepted
rejected
withdrawn
```

### Suggested connection statuses

```text
pending
accepted
rejected
blocked
```

The application should reject values outside the controlled vocabulary.

---

## 17. Delete and Update Policies

The correct deletion behavior depends on data retention requirements. The following policy is a safe starting point.

| Parent object | Dependent object | Recommended behavior |
|---|---|---|
| `RESEARCHER_PROFILE` | subtype rows | Cascade only when the profile is permanently deleted. |
| `RESEARCHER_PROFILE` | `RESEARCHER_CONTACT` | Cascade or remove explicitly. |
| `RESEARCHER_PROFILE` | `RESEARCHER_EXPERTISE` | Remove association rows. |
| `RESEARCHER_PROFILE` | `NOTIFICATION` | Archive or delete according to retention policy. |
| `RESEARCHER_PROFILE` | `CONNECTION` | Preserve history or anonymize participants. |
| `PUBLICATION` | `CITATION_RECORD` | Cascade only if citation history can be deleted. |
| `PUBLICATION` | `PUBLICATION_CONTRIBUTION` | Usually preserve or archive academic contribution history. |
| `PUBLICATION_CONTRIBUTION` | `PUBLICATION_REVIEW` | Preserve review audit records or restrict deletion. |
| `RESEARCHER_PROFILE` | `APPLICATION` | Restrict deletion, archive applications, or anonymize the applicant. |
| `RESEARCHER_POST` | `APPLICATION` | Restrict deletion while applications exist or archive the post. |
| `RESEARCH_AREA` | `PUBLICATION_CONTRIBUTION` | Prevent deletion while referenced or archive the area. |

Avoid unrestricted cascading deletion of academic records, review history, or researcher identity data.

---

## 18. Database Views That May Be Useful

## 18.1 Researcher directory view

```sql
CREATE VIEW researcher_directory AS
SELECT researcher_id,
       first_name,
       last_name,
       email,
       profile_picture,
       research_interest,
       university_name,
       institution,
       profile_verified,
       visibility_pub_pri
FROM RESEARCHER_PROFILE
WHERE visibility_pub_pri = 'public';
```

The final implementation should exclude private fields such as password hashes and restricted contact information.

## 18.2 Publication contribution view

```sql
CREATE VIEW publication_contribution_details AS
SELECT pc.researcher_id,
       pc.publication_id,
       pc.research_area_id,
       pc.author_order,
       pc.contribution_role,
       p.doi,
       p.title,
       p.abstract,
       ra.research_area_name,
       rp.first_name,
       rp.last_name
FROM PUBLICATION_CONTRIBUTION AS pc
JOIN PUBLICATION AS p
  ON p.publication_id = pc.publication_id
JOIN RESEARCH_AREA AS ra
  ON ra.research_area_id = pc.research_area_id
JOIN RESEARCHER_PROFILE AS rp
  ON rp.researcher_id = pc.researcher_id;
```

## 18.3 Researcher publication count view

```sql
CREATE VIEW researcher_publication_counts AS
SELECT rp.researcher_id,
       COUNT(pc.publication_id) AS publication_count
FROM RESEARCHER_PROFILE AS rp
LEFT JOIN PUBLICATION_CONTRIBUTION AS pc
  ON pc.researcher_id = rp.researcher_id
GROUP BY rp.researcher_id;
```

---

## 19. Transaction Boundaries

The following operations should normally be atomic.

### Profile creation transaction

```text
RESEARCHER_PROFILE insert
subtype insert
contact rows insert
```

### Contribution transaction

```text
validate researcher
validate publication
validate research area
insert PUBLICATION_CONTRIBUTION
```

### Review transaction

```text
validate admin
validate contribution occurrence
insert or update PUBLICATION_REVIEW
update RESEARCHER_PROFILE.profile_verified
```

### Application transaction

```text
validate applicant researcher
validate research post
insert APPLICATION with applicant_researcher_id and post_id
```

The foreign keys prevent an application from referencing a missing applicant or post.

---

## 20. E-R to Relational Mapping Rules Used

### Strong entities

Each strong entity becomes a relation with its simple attributes and primary key.

Examples:

```text
PUBLICATION -> PUBLICATION
RESEARCH_AREA -> RESEARCH_AREA
ADMIN -> ADMIN
APPLICATION -> APPLICATION
```

### Composite attributes

Store the simple components, not necessarily the composite parent.

```text
full_name -> first_name, last_name
```

### Multivalued attributes

Create a separate relation containing:

- The owner primary key.
- The multivalued attribute.
- A composite primary key.

```text
contact_info -> RESEARCHER_CONTACT(researcher_id, contact_info)
```

### 1:N relationships

Place the primary key of the one-side entity as a foreign key in the many-side relation.

```text
RECEIVES -> NOTIFICATION.researcher_id
CREATES -> RESEARCHER_POST.posted_by_researcher_id
APPLIES_FOR -> APPLICATION.applicant_researcher_id
HAS_APPLICATION -> APPLICATION.post_id
```

### M:N relationships

Create a bridge table containing the primary keys of both participating entities.

```text
HAS_EXPERTISE -> RESEARCHER_EXPERTISE
```

### Ternary relationships

Create a relation containing the primary keys of all three participating entities, generally as one composite primary key.

```text
CONTRIBUTES_TO -> PUBLICATION_CONTRIBUTION
```

### Weak entities

Include the owner primary key in the weak entity relation and combine it with the partial key.

```text
CITATION_RECORD -> (publication_id, citation_id)
```

### Specialization

Use a supertype table and subtype tables. The subtype key is also a foreign key to the supertype.

### Recursive relationships

Create one relation with two foreign keys referencing the same entity table. Give each FK a role name.

```text
sender_researcher_id
receiver_researcher_id
```

### Aggregation

Treat the aggregate occurrence as a referenceable logical object. Store the keys of the underlying relationship occurrence in the reviewing relation.

```text
PUBLICATION_REVIEW(
    contributor_id,
    publication_id,
    research_area_id
)
```

---

## 21. Current Model Exclusions

The following items are intentionally not part of the current corrected model:

- `student_id`. The current student attribute is `student_no`.
- `country` in `RESEARCHER_PROFILE`.
- `review_id` in `PUBLICATION_REVIEW`.
- `citation_count` in `PUBLICATION`.
- `citation_year` as the weak entity partial key.
- `citation_year` as a key of `CITATION_RECORD`.
- `faculty_rank` in `FACULTY_RESEARCHER`.
- `office_room` in `FACULTY_RESEARCHER`.
- `designation` in `RESEARCHER_PROFILE`.
- `topic_name` and other older publication attributes not shown in the corrected model.
- `RESEARCHER_RESEARCH_AREA` as a standalone bridge table.
- Application attributes attached directly to `APPLIES_FOR`.
- A standalone `full_name` relational column.
- A stored `publication_count` relational column.

These exclusions prevent older versions of the design from being accidentally reintroduced.

---

## 22. Diagram Reading Guide

### Rectangle

Strong entity.

### Double rectangle

Weak entity. In this model, `CITATION_RECORD` is shown with a double border.

### Diamond

Relationship such as `RECEIVES`, `CREATES`, `APPLIES_FOR`, `HAS_APPLICATION`, or `CONNECTS`.

### Double diamond

The visual convention used for the weak-entity owner relationship. The relationship text currently displayed is `HAS_CITATION`.

### Ellipse

Attribute.

### Underlined attribute

Primary key or key attribute.

### Dashed-underlined attribute

Partial key for the weak entity. In the current model, this is `citation_id`.

### Dashed ellipse

Derived attribute. In this model, `publication_count` is derived.

### Double ellipse

Multivalued attribute. In this model, `contact_info` is multivalued.

### Triangle

`ISA` specialization. The current triangle points upward toward the subtype branch and connects to the `RESEARCHER_PROFILE` supertype below.

### Dashed enclosure

Aggregation boundary. The current boundary contains the contribution occurrence formed by researcher, publication, and research area.

---

## 23. Verification Checklist

### Conceptual E-R checks

- [ ] `RESEARCHER_PROFILE` exists as the supertype.
- [ ] `STUDENT_RESEARCHER` exists as a subtype.
- [ ] `student_no` is outside the student subtype box.
- [ ] `degree_program` is outside the student subtype box.
- [ ] `FACULTY_RESEARCHER` exists as a subtype.
- [ ] `designation` is outside the faculty subtype box.
- [ ] `faculty_rank` is absent.
- [ ] `office_room` is absent.
- [ ] ISA specialization is total and disjoint.
- [ ] The ISA triangle is oriented upward in the current diagram.
- [ ] `full_name` connects to the researcher profile.
- [ ] `first_name` and `last_name` are components of `full_name`.
- [ ] `designation` is absent from researcher profile.
- [ ] `profile_verified` connects to researcher profile.
- [ ] `country` is absent from researcher profile.
- [ ] `institution` connects to researcher profile.
- [ ] `NOTIFICATION` remains represented.
- [ ] `EXPERTISE_AREA` remains represented.
- [ ] `PUBLICATION` contains only the corrected attributes.
- [ ] `citation_count` is absent from publication.
- [ ] `RESEARCH_AREA` has `research_area_id`, `research_area_name`, and `description`.
- [ ] `CONTRIBUTES_TO` has three participating entities.
- [ ] `author_order` and `contribution_role` belong to the contribution relationship.
- [ ] The contribution is enclosed by the aggregation boundary.
- [ ] `ADMIN` replaces faculty as the reviewer.
- [ ] `ADMIN` has `admin_id`.
- [ ] `REVIEWS` has `review_status` and `reviewed_at`.
- [ ] Review status is documented as the source of profile verification.
- [ ] `HAS_CITATION` connects publication to weak citation record.
- [ ] `CITATION_RECORD` is a weak entity.
- [ ] `citation_id` is the partial key.
- [ ] `citation_year` is a normal attribute.
- [ ] `citation_count` belongs to citation record.
- [ ] `RESEARCHER_POST` has external title, deadline, and role type attributes.
- [ ] `post_id` and `required_skill` remain represented.
- [ ] `APPLICATION` is a separate entity.
- [ ] Application attributes are connected to the application entity.
- [ ] `APPLIES_FOR` connects researcher profile to application.
- [ ] `HAS_APPLICATION` connects research post to the same application entity.
- [ ] One research post can have many applications.
- [ ] Each application belongs to one research post and one applicant researcher.
- [ ] `CONNECTS` returns to researcher profile.
- [ ] Sender and receiver roles are named.
- [ ] Connection attributes are represented.

### Relational schema checks

- [ ] Every strong entity has a primary key.
- [ ] Subtype keys are also foreign keys to the supertype.
- [ ] `RESEARCHER_PROFILE` has `institution` and no `country`.
- [ ] `RESEARCHER_PROFILE` has no stored `publication_count`.
- [ ] `STUDENT_RESEARCHER` has `student_no`.
- [ ] `FACULTY_RESEARCHER` has only `designation` as its subtype-specific field.
- [ ] `NOTIFICATION.researcher_id` implements `RECEIVES`.
- [ ] `RESEARCHER_CONTACT` maps multivalued contact information.
- [ ] `RESEARCHER_EXPERTISE` maps expertise association.
- [ ] `PUBLICATION_CONTRIBUTION` has a three-column composite key.
- [ ] `PUBLICATION_REVIEW` references the exact contribution occurrence.
- [ ] `PUBLICATION_REVIEW` has no `review_id`.
- [ ] `PUBLICATION_REVIEW` has `admin_id`.
- [ ] `CITATION_RECORD` has composite key `(publication_id, citation_id)`.
- [ ] `APPLICATION` contains application attributes.
- [ ] `APPLICATION.applicant_researcher_id` implements `APPLIES_FOR`.
- [ ] `APPLICATION.post_id` implements `HAS_APPLICATION`.
- [ ] `CONNECTION` has two FKs to `RESEARCHER_PROFILE`.
- [ ] No stale `RESEARCHER_RESEARCH_AREA` table remains in the current diagram.
- [ ] Applications for a post can be found with `APPLICATION.post_id`.
- [ ] No stale `country` column remains.
- [ ] No stale `review_id` column remains.

### Rendering checks

- [ ] ER diagram SVG loads without syntax errors.
- [ ] Schema diagram SVG loads without syntax errors.
- [ ] ER PNG is regenerated after model changes.
- [ ] Schema PNG is regenerated after model changes.
- [ ] Diagram text remains readable at the intended desktop canvas width.
- [ ] Diagram connectors terminate on the intended entity or table edges.
- [ ] Schema connectors remain behind table content.
- [ ] The hosted page loads both diagram sections.
- [ ] The hosted page has no browser console errors.

---

## 24. Final Design Summary

The final database design is centered on `RESEARCHER_PROFILE` and extends it through student and faculty specialization. Researchers can receive notifications, maintain expertise, create posts, submit applications, and connect to one another through a role-based recursive relationship.

Publications are classified through the ternary `CONTRIBUTES_TO` relationship, which preserves the researcher-publication-research-area fact as one composite row. That relationship occurrence is aggregated and reviewed by an `ADMIN`. The review stores a status and timestamp, and the status drives the researcher's `profile_verified` state.

Citation history is modeled as a weak entity owned by a publication. The citation partial key is `citation_id`, and the complete key is `(publication_id, citation_id)`. Publication itself stores only its identifier, DOI, title, and abstract in the corrected model.

The relational schema preserves the E-R semantics through shared-key specialization, bridge tables for multivalued and many-to-many data, a ternary contribution table, composite weak-entity identification, a review table referencing the aggregate occurrence, an application entity with applicant and post foreign keys, and a two-FK recursive connection table.

The design intentionally excludes removed fields and older structures so the diagrams, relational schema, and explanation remain consistent with the latest approved model.
