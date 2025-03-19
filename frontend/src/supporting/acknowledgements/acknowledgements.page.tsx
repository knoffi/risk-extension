import { useEffect, useState } from "react";
import { Link } from "react-router";
import { defaultConfigService } from "src/supporting/config/config.service";

export const AcknowledgementsPage = () => {
    const [isBackendRunning, setIsBackendRunning] = useState(false);

    const backendUrl = defaultConfigService.getSocketUrl();
    const env = defaultConfigService.getEnvironment();

    useEffect(() => {
        fetch("http://localhost:3001/api/health-check", { method: "GET" }).then(
            (res) => setIsBackendRunning(res.status === 200 ? true : false)
        );
    }, []);

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
                    Runs on {env}, using socket connection from: {backendUrl}
                </p>
            </div>
            <br />
            <p>
                <Link to={"/login"}>Back to Login</Link>
            </p>
        </div>
    );
};
