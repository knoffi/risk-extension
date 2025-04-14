import { GetAllUserResponse } from "@shared/src/supporting/user/dto";
import { useEffect, useState } from "react";
import { User } from "src/supporting/authenticated/user";
import { defaultConfigService } from "src/supporting/config/config.service";

export const ManageUserPage: React.FC = () => {
    const [users, setUsers] = useState<GetAllUserResponse | null>(null);
    const [options, setOptions] = useState<Option[] | null>(null);

    useEffect(() => {
        const origin = defaultConfigService.getApiOrigin();
        fetch(origin + "/api/user/")
            .then((res) => res.json())
            .then(setUsers)
            .catch((error) => console.error(error));

        fetch(origin + "/api/role/")
            .then((res) => res.json())
            .then(setOptions)
            .catch((error) => console.error(error));
    }, []);

    const panels = users ? (
        users.map((user) => <UserPanel user={user} key={user.id} />)
    ) : (
        <p>Loading...</p>
    );

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <CreateUser />
            {options ? (
                <Form
                    inputs={[
                        { type: "text", dtoKey: "name", title: "Username" },
                        { type: "text", dtoKey: "password", title: "Password" },
                        {
                            type: "radio",
                            dtoKey: "roleId",
                            title: "Role",
                            options,
                        },
                    ]}
                />
            ) : (
                <p>Loading...</p>
            )}
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

const CreateUser = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (data: FormData) => {
        const name = data.get("username");
        const password = data.get("password");

        fetch(defaultConfigService.getApiOrigin() + "/api/user", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <form action={onSubmit}>
            <label>Username</label>
            <input
                type="text"
                value={name}
                name="username"
                onChange={(e) => setName(e.target.value)}
            />
            <label>Password</label>
            <input
                type="text"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Submit" />
        </form>
    );
};

interface Option {
    name: string;
    id: string;
}

type Input = {
    dtoKey: string;
    title: string;
} & ({ type: "text" } | { type: "radio"; options: Option[] });

interface FormProps {
    inputs: Input[];
}

type InputsState<T extends Input[]> = Record<T[number]["dtoKey"], string>;

type Dto = Record<string, string | null>;

const reduceAnker: Partial<InputsState<FormProps["inputs"]>> = {};

const Form = (props: FormProps) => {
    const defaultProps = props.inputs.reduce(
        (prev, cur) => ({ ...prev, [cur.dtoKey]: "" }),
        reduceAnker
    );

    const [form, setForm] = useState(defaultProps);

    const onSubmit = (formData: FormData) => {
        const dto: Dto = Object.keys(defaultProps).reduce((prev, curKey) => {
            const curKeyAddition = { [curKey]: formData.get(curKey) } as Dto;
            return { ...prev, ...curKeyAddition };
        }, {} as Dto);

        Object.keys(dto).forEach((key) =>
            console.log(key + " :: " + typeof dto[key] + "  " + dto[key])
        );
    };

    const inputs = props.inputs.map((input) => {
        const valueProps = {
            value: form[input.dtoKey],
            setValue: (value: string) =>
                setForm((prevForm) => ({
                    ...prevForm,
                    [input.dtoKey]: value,
                })),
        };

        switch (input.type) {
            case "text":
                return (
                    <TextInput key={input.dtoKey} {...input} {...valueProps} />
                );

            default:
                return (
                    <SwitchInput
                        key={input.dtoKey}
                        {...input}
                        {...valueProps}
                    />
                );
        }
    });

    return (
        <form action={onSubmit}>
            <div style={{ gap: 5, display: "flex", flexDirection: "column" }}>
                {inputs}
            </div>
            <input type="submit" value="Submit" />
        </form>
    );
};

type TextInputProps = Input & {
    setValue: (value: string) => void;
    value?: string;
} & { type: "text" };

const TextInput = ({
    dtoKey,
    title,
    type,
    setValue,
    value,
}: TextInputProps) => {
    console.log("Rerender: " + dtoKey);
    return (
        <div style={{ gap: 5, display: "flex" }}>
            <label>{title}</label>
            <input
                type={type}
                value={value}
                name={dtoKey}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

type SwitchInputProps = Input & {
    setValue: (value: string) => void;
    value?: string;
} & { type: "radio" };

const SwitchInput = ({
    dtoKey,
    title,
    type,
    setValue,
    options,
}: SwitchInputProps) => {
    console.log("Rerender: " + dtoKey);

    return (
        <div style={{ gap: 5, display: "flex" }}>
            <label>{title}</label>
            {options.map((option) => (
                <div key={option.id}>
                    <input
                        type={type}
                        value={option.id}
                        name={dtoKey}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <label>{option.name}</label>
                </div>
            ))}
        </div>
    );
};
