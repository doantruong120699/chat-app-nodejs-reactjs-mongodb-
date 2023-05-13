const BaseFields = {
    CREATED_AT: "createdAt",
    UPDATED_AT: "updatedAt"
}

const UserFields = {
    ID: 'id',
    USERNAME: 'username',
    EMAIL: 'email',
    PASSWORD: 'password',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    IS_ACTIVE: 'is_active',
    ...BaseFields,
};

const ProfileFields = {
    ID: 'id',
    USER_ID: 'UserId',
    BIRTHDAY: 'birthday',
    PHONE_NUMBER: 'phonenumber',
    ADDRESS: 'address',
    GENDER: 'gender',
    AVATAR: 'avatar',
    ...BaseFields,
};

module.exports = {
    UserFields,
    ProfileFields
};