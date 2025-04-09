import { GetAllUserResponse } from "@shared/src/supporting/user/dto";
import { useEffect, useState } from "react";
import { User } from "src/supporting/authenticated/user";
import { defaultConfigService } from "src/supporting/config/config.service";

export const ManageUserPage: React.FC = () => {
    const [users, setUsers] = useState<GetAllUserResponse | null>(null);

    useEffect(() => {
        const origin = defaultConfigService.getApiOrigin();
        fetch(origin + "/api/user/")
            .then((res) => res.json())
            .then(setUsers)
            .catch((error) => console.error(error));
    }, []);

    const panels = users ? (
        users.map((user) => <UserPanel user={user} />)
    ) : (
        <p>Loading...</p>
    );

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <p>You can manage users!</p>
            {panels}
        </div>
    );
};

const UserPanel = (props: { user: User }) => {
    return (
        <div>
            <p>{props.user.name}</p>
        </div>
    );
};
