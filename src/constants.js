let ENDPOINT = "";
if (import.meta.env.MODE === "development") {
  ENDPOINT = "http://localhost:5000";
} else if (import.meta.env.MODE === "production") {
  ENDPOINT = "https://cryptoinsight-final-evaluation-1.onrender.com";
}

export default ENDPOINT;
