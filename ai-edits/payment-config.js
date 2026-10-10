/*
 * Cash App uses the owner's existing profile; customers enter the displayed
 * amount and package-specific note. Square links have fixed one-time amounts.
 */
window.AI_EDIT_PAYMENTS = Object.freeze({
  recipient: "$mathewstevens",
  depositUrl: "https://cash.app/$mathewstevens",
  finalUrl: "https://cash.app/$mathewstevens",
  packages: Object.freeze({
    "single-10": Object.freeze({
      label: "Single person · 10s",
      title: "One person. One standout moment.",
      description: "Replace one person in a scene up to 10 seconds long. A quick moment, made yours.",
      scope: "1 person · Up to 10 seconds",
      total: 50,
      installment: 25,
      maxSeconds: 10,
      squareDepositUrl: "https://square.link/u/ZMB38lKL",
      squareFinalUrl: "https://square.link/u/6koxElmt"
    }),
    "single-30": Object.freeze({
      label: "Single person · 30s",
      title: "More time in the spotlight.",
      description: "Replace one person in a scene up to 30 seconds long. More room for the full moment.",
      scope: "1 person · Up to 30 seconds",
      total: 70,
      installment: 35,
      maxSeconds: 30,
      squareDepositUrl: "https://square.link/u/0JdqDXhl",
      squareFinalUrl: "https://square.link/u/aMVAoxHd"
    }),
    multi: Object.freeze({
      label: "Multi-person replacement",
      title: "Bring everyone into the scene.",
      description: "Replace multiple people in the same edit. We’ll confirm who’s in it and the clip length before you pay.",
      scope: "Multiple people · Clip length confirmed together",
      total: 100,
      installment: 50,
      maxSeconds: null,
      squareDepositUrl: "https://square.link/u/jKyccs7G",
      squareFinalUrl: "https://square.link/u/IoTETqLD"
    })
  })
});
