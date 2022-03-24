import PermissionRepository from "./PermissionRepository";
import RoleRepository from "./RoleRepository";
import UserRepository from "./UserRepository";
import MerchantRepositori from "./MerchantRepository";
import BookletRepository from "./BookletRepository";
import MemberRepository from "./MemberRepository";

export default ($axios) => ({
    permission: PermissionRepository($axios),
    role: RoleRepository($axios),
    user: UserRepository($axios),
    merchant: MerchantRepositori($axios),
    booklet: BookletRepository($axios),
    member: MemberRepository($axios)
})