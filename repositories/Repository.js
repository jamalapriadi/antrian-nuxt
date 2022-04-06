import PermissionRepository from "./PermissionRepository";
import RoleRepository from "./RoleRepository";
import UserRepository from "./UserRepository";
import KeperluanRepository from "./KeperluanRepository";
import ReceptionistRepository from "./ReceptionistRepository";

export default ($axios) => ({
    permission: PermissionRepository($axios),
    role: RoleRepository($axios),
    user: UserRepository($axios),
    keperluan: KeperluanRepository($axios),
    receptionist: ReceptionistRepository($axios)
})