import { useState, useEffect, useContext } from "react";
import { navigate } from "gatsby";
import UserContext from "../../context/UserContext";

export default function(initialValue, props, name, apiOptions, setIsLoading) {
  const [value, setValue] = useState(initialValue);
  const homeId = useContext(UserContext).user.home.id;
  //Check for id passed from referrer, otherwise attempt to find thing by name
  let apiCall;
  //TODO yuck
  if (props.location && props.location.state && props.location.state._id) {
    apiCall = () => apiOptions.getById({ _id: props.location.state._id });
  } else if (name && homeId) {
    apiCall = () => apiOptions.getByName({ _id: homeId }, name);
  } else {
    //TODO maybe add alert saying you are being redirected?
    navigate("/Items/", {
      replace: true
    });
  }

  useEffect(() => {
    setIsLoading(true);
    apiCall()
      .then(response => {
        setValue(response.data);
        //TODO add in behavior if there is no response; might be a custom item that couldn't be fetched by name
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { value, setValue };
}
