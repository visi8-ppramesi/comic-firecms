import {
    buildCollection
} from "ppramesi-firecms";
import { UserRole } from "@/types/userRoles";

export const userRolesCollection = buildCollection<UserRole>({
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