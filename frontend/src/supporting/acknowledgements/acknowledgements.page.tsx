import { useEffect, useState } from "react";
import { Link } from "react-router";

export const AcknowledgementsPage = () => {
    const [isBackendRunning, setIsBackendRunning] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/api/health-check", { method: "GET" }).then(
            (res) => setIsBackendRunning(res.status <= 299 ? true : false)
        );
    }, []);

    return (
        <div>
            <h1>Acknowledgements</h1>
            <p>
                See https://www.svgrepo.com/svg/403931/world-map for PWA icon
                svg
            </p>
            <br />
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
                        margin: 20,
                    }}
                />
                <p>
                    <Link to={"/Login"}>Back to Login</Link>
                </p>
            </div>
        </div>
    );
};
