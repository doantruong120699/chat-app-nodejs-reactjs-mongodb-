export class PostUtils {
  constructor(private post: any) {}

  getOwner(user: any): string {
    return user.profile.firstName + ' ' + user.profile.lastName;
  }
}
