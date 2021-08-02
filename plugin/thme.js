import {
  useState,
  useEffect,
  createContext,
  useContext
} from "react";

const colors = {
  light: "bg-white text-dark",
  dark: "bg-nwar text-white"
};


export const useClass = (bol = false) => {

  const [darkTheme, setDarkTheme] = useState(bol)
  useEffect(() => {

    const MyTheme = localStorage.getItem("darkTheme");
    MyTheme && setDarkTheme((MyTheme == "true") ? true : false);
    
  }, [])

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme])


  return [
    darkTheme,
    setDarkTheme,
    useContext(createContext(darkTheme ? colors.dark : colors.light))
  ]
}