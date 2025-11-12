let ENDPOINT = "";
if (import.meta.env.MODE === "development") {
  ENDPOINT = "http://localhost:5000";
} else if (import.meta.env.MODE === "production") {
  ENDPOINT = "";
}

export default ENDPOINT;
