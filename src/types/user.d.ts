import {User} from 'firebase/auth';

interface UserPermissions {
  write: boolean;
  create: boolean;
}

interface UserWithPermissions extends User {
  permissions: UserPermissions
}