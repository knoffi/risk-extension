import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Pages } from "src/pages";
import { defaultConfigService } from "src/supporting/config/config.service";

export const AcknowledgementsPage: React.FC = () => {
    const [isBackendRunning, setIsBackendRunning] = useState(false);

    const socketOrigin = defaultConfigService.getSocketOrigin();
    const apiOrigin = defaultConfigService.getApiOrigin();
    const env = defaultConfigService.getEnvironment();

    useEffect(() => {
        fetch(apiOrigin + "/api/health-check", { method: "GET" }).then((res) =>
            setIsBackendRunning(res.status === 200 ? true : false)
        );
    }, [apiOrigin]);

    return (
        <div>
            <h1>Acknowledgements</h1>
            <p>
                See https://www.svgrepo.com/svg/403931/world-map for PWA icon
                svg!
            </p>
            <br />
            <h1>Connection & Environment</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <rect
                    style={{
                        width: 10,
                        height: 10,
                        backgroundColor: isBackendRunning ? "green" : "red",
                        margin: 23,
                    }}
                />
                <p>
                    Runs on {env}, using socket connection from: {socketOrigin}{" "}
                    and api from: {apiOrigin}
                </p>
            </div>
            <br />
            <p>
                <Link to={Pages.LOGIN_PUBLIC}>Back to Login</Link>
            </p>
        </div>
    );
};
