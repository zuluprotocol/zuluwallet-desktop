import React from "react";

import {GetConfig} from "../../api/service";
import {Config} from "../../models/config";
import {ConfigDetails} from "../../components/config/config-details";
import {ErrorMessage} from "../../components/error-message";
import {Link} from "react-router-dom";

const Home = () => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [config, setConfig] = React.useState<Config | null>(null);

    React.useEffect(() => {
        GetConfig()
            .then(result => setConfig(result))
            .catch(error => setErrorMessage(error));
    }, [])

    return (
        <div>
            <h1>Config <Link to="/service/config/edit">(edit)</Link></h1>
            <hr/>
            {config !== null
                ? <ConfigDetails config={config}/>
                : <ErrorMessage message={errorMessage}/>
            }
        </div>
    );
};

export default Home;
