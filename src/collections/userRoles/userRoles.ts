import {
    buildCollection
} from "@camberi/firecms";
import { UserRoles } from "@/types/userRoles";

export const userRolesCollection = buildCollection<UserRoles>({
    name: "User Roles",
    path: "user_roles",
    properties: {
        roles: {
            name: "Roles",
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
    }
})