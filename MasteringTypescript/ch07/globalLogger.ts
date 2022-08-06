class GlobalLogger {
  public static logGlobalsToConsole() {
    for (let email of CONTACT_EMAIL_ARRAY) {
      console.log(`Contact: ${email}`);
    }
  }
}

window.onload = () => {
  GlobalLogger.logGlobalsToConsole();
};
