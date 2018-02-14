### Resources

Database resources for [The DB](https://github.com/the-labo/the-db)

* [Alias Resource](#Alias-Resource)
* [History Resource](#History-Resource)
* [Profile Resource](#Profile-Resource)
* [Role Resource](#Role-Resource)
* [Sign Resource](#Sign-Resource)
* [User Resource](#User-Resource)


<a name="Alias-Resource" ></a>
**Alias Resource**

* [server/db/resources/AliasResource.js](server/db/resources/AliasResource.js)

| Property | Description | Type | Required | Unique |
| ---- | ---- | ---- | --- | --- |
| key | Alias key | cly:string | true | true |
| originalUrl | Original path of alias | cly:string | true | true |
| pathname | Shortened pathname | cly:string | true | true |


<a name="History-Resource" ></a>
**History Resource**

* [server/db/resources/HistoryResource.js](server/db/resources/HistoryResource.js)

| Property | Description | Type | Required | Unique |
| ---- | ---- | ---- | --- | --- |
| createdAt | Created date | cly:date |  |  |
| data | History data | cly:object |  |  |
| key | History key | cly:string | true |  |
| type | History type | cly:string | true |  |


<a name="Profile-Resource" ></a>
**Profile Resource**

* [server/db/resources/ProfileResource.js](server/db/resources/ProfileResource.js)

| Property | Description | Type | Required | Unique |
| ---- | ---- | ---- | --- | --- |
| email | Email of user | cly:string |  | true |
| emailVerified | Email has verified or not | cly:boolean |  |  |
| image | Profile image | cly:string |  |  |
| name | Display Name | cly:string |  |  |
| user | User | cly:entity,cly:ref | true | true |


<a name="Role-Resource" ></a>
**Role Resource**

* [server/db/resources/RoleResource.js](server/db/resources/RoleResource.js)

| Property | Description | Type | Required | Unique |
| ---- | ---- | ---- | --- | --- |
| code | Role code | cly:string | true |  |


<a name="Sign-Resource" ></a>
**Sign Resource**

* [server/db/resources/SignResource.js](server/db/resources/SignResource.js)

| Property | Description | Type | Required | Unique |
| ---- | ---- | ---- | --- | --- |
| passwordHash | Password hash of user | cly:string | true |  |
| passwordSalt | Password salt | cly:string | true |  |
| signInAt | Last time signed in | cly:date |  |  |
| signOutAt | Last time signed out | cly:date |  |  |
| signUpAt | Date of signing up | cly:date |  |  |
| user | User | cly:entity,cly:ref | true | true |


<a name="User-Resource" ></a>
**User Resource**

* [server/db/resources/UserResource.js](server/db/resources/UserResource.js)

| Property | Description | Type | Required | Unique |
| ---- | ---- | ---- | --- | --- |
| createdAt | Created date | cly:date |  |  |
| lang | User language | cly:string |  |  |
| name | Name of resource | cly:string | true | true |
| profile | User profile | cly:entity,cly:ref |  |  |
| role | User Role | cly:entity,cly:ref |  |  |
| sign | User sign | cly:entity,cly:ref |  |  |

