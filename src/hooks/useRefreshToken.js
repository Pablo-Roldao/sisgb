import axios from '../api/axios';
import useAuth from './useAuth';

const REFRESH_URL = '/refresh';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();

    const refresh = async () => {
        /*const response = await axios.get(REFRESH_URL, {},{
            withCredentials: true
        });*/
        const response = await axios.post(REFRESH_URL,
            JSON.stringify({
                refreshToken: auth.refreshToken
            }),
            {
              headers: { 'Content-Type': 'application/json' }
            }
          );

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken };
        });
        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken