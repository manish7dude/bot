(function () {


  var appConfig = {
    WEB_CHAT_JS_URL: "https://nonprdzammostormhzvq.blob.core.windows.net/zammo-bot-ui-kit/zammo-bot-ui-kit-0.13.0.min.js",
    WEB_CHAT_ID: "00000000-0000-0000-0000-000000000000",
    WEB_CHAT_BASE_URL: "https://zammo-saccountydev.azurewebsites.net",
    WEB_CHAT_SESSION_TTL: "3600",
    WEB_CHAT_CSS_URL: "https://nonprdzammostormhzvq.blob.core.windows.net/zammo-bot-ui-kit/zammo-bot-ui-kit-0.13.0.min.css",
    ASSET_URL: "https://cdn.jsdelivr.net/gh/manish7dude/bot@main/images"
  };


const CP_SESSION_KEY = "chatbot_session";
const CP_PROFILE_KEY = "chatbot_profile";

  var chatWindowMessages = {
    RESET_CHAT_INFO: "Reset the conversation",
    END_CHAT_INFO: "End the conversation"
  };

  function isUserAuthenticated() {
    return true; // Replace with actual logic
  }

  function getToken(callback) {
    // Replace with actual async logic
    setTimeout(function () {
      callback("mock-token");
    }, 300);
  }

  // function signIn() {
  //   window.location.href = "/login";
  // }

  function setReshapeChatIcon() {
    var chatIconHtml = `
  <div class="bottom-container">
    <div class="chat-text-scroll">
      <span>Hey there!</span>
    </div>
    <div class="chat-icon">
      <img src="https://cdn.jsdelivr.net/gh/manish7dude/bot@main/images/sacramento.png" alt="Chat Icon">
    </div>
  </div>
`;
    //var chatIconHtml = '<div class="bottom-container">...</div>'; // Use your SVG/HTML here
    var zammoChatbot = document.getElementById("zammoBotUIComponent");

    if (zammoChatbot) {
      var chatBotElement = document.createElement("span");
      chatBotElement.innerHTML = chatIconHtml;
      chatBotElement.setAttribute("id", "chatBotIcon");

      var zammoChatbotButton = zammoChatbot.querySelector("#zammoBotUIComponent--chatIcon");
      var zammoChatbotDiv = zammoChatbot.querySelector("#chatBotIcon");

      if (zammoChatbotButton && !zammoChatbotDiv) {
        zammoChatbotButton.className += " show focus-visible";
        zammoChatbotButton.insertBefore(chatBotElement, zammoChatbotButton.firstChild);
      }
    }
  }

  function resetChat() {
    if (window.chatBotInstance && window.chatBotInstance.socket) {
      window.chatBotInstance.socket.close();
    }
    if (window.chatBotInstance && typeof window.chatBotInstance.resetSession === "function") {
      window.chatBotInstance.resetSession();
    }
    if (window.chatBotInstance && typeof window.chatBotInstance.appendTyping === "function") {
      window.chatBotInstance.appendTyping();
    }
  }

  function closeChat() {
    resetChat();
    if (window.chatBotInstance && typeof window.chatBotInstance.clearChatHistory === "function") {
      window.chatBotInstance.clearChatHistory();
    }
    if (window.chatBotInstance && typeof window.chatBotInstance.closeChat === "function") {
      window.chatBotInstance.closeChat();
    }
  }

  function addRestartConversationOption(chatContainer) {
    var headerEl = chatContainer.querySelector("#zammoBotUIComponent--chatFrame--header");
    if (!headerEl) return;

    if (!chatContainer.querySelector("#zammoBotUIComponent--chatFrame--header--resetIcon")) {
      var doeIcon = appConfig.ASSET_URL + "/sacramento.png";

      var camiIconEl = document.createElement("div");
      camiIconEl.innerHTML = '<img class="bot-icon" src="https://cdn.jsdelivr.net/gh/manish7dude/bot@main/images/sacramento.png" alt="Cami Icon"/><span class="bot-title">Cami</span>';
      headerEl.insertBefore(camiIconEl, headerEl.children[0]);

      var resetEl = document.createElement("div");
resetEl.className = "help-tooltip reset-conversation reset-btn";

resetEl.innerHTML =
      '<button class="secondary-btn" id="zammoBotUIComponent--chatFrame--header--resetIcon" title="' +
      chatWindowMessages.RESET_CHAT_INFO +
      '">' +
      // Reset icon (using material icons as in the close button)
      '<i class="material-icons mode-close skiptranslate reset-btn-icon">replay</i>' +
      '</button>' +
      '<div class="help-tooltip-container help-tooltip-reset">' +
      '<div class="help-tooltip-body align-items-center">' +
      '<div class="text-center">Are you sure you want to end this conversation and start a new one?</div>' +
      '<div class="pt-2 pe-2 d-flex mt-2 w-100">' +
      '<button class="secondary-btn reset-confirmation-button flex-fill" id="restart-conversation-no">No</button>' +
      '<button class="secondary-btn reset-confirmation-button ms-3 flex-fill" id="restart-conversation-yes">Yes</button>' +
      '</div></div></div>';

      headerEl.insertBefore(resetEl, headerEl.children[1]);

      var endConvEl = document.createElement("div");
      endConvEl.className = "help-tooltip reset-conversation";
      endConvEl.innerHTML =
        '<button class="secondary-btn" id="zammoBotUIComponent--chatFrame--header--endConvIcon" title="' +
        chatWindowMessages.END_CHAT_INFO +
        '"><i class="material-icons mode-close skiptranslate close-btn">close</i></button>' +
        '<div class="help-tooltip-container help-tooltip-close">' +
        '<div class="help-tooltip-body align-items-center">' +
        '<div class="text-center">Are you sure you want to close this chat?</div>' +
        '<div class="pt-2 pe-2 d-flex mt-2 w-100">' +
        '<button class="secondary-btn reset-confirmation-button flex-fill" id="end-conversation-no">No</button>' +
        '<button class="secondary-btn reset-confirmation-button ms-3 flex-fill" id="end-conversation-yes">Yes</button>' +
        '</div></div></div>';

      headerEl.appendChild(endConvEl);

      headerEl.querySelector("#zammoBotUIComponent--chatFrame--header--resetIcon").onclick = function () {
        console.log(resetEl.className);
        console.log("1");
        resetEl.className += " active";
        endConvEl.className = endConvEl.className.replace(" active", "");
      };

      resetEl.querySelector("#restart-conversation-no").onclick = function () {
        console.log(resetEl.className);
        console.log("2");
        resetEl.className = resetEl.className.replace(" active", "");
      };

      resetEl.querySelector("#restart-conversation-yes").onclick = function () {
        resetEl.className = resetEl.className.replace(" active", "");
        resetChat();
      };

      headerEl.querySelector("#zammoBotUIComponent--chatFrame--header--endConvIcon").onclick = function () {
        endConvEl.className += " active";
        resetEl.className = resetEl.className.replace(" active", "");
      };

      endConvEl.querySelector("#end-conversation-no").onclick = function () {
        endConvEl.className = endConvEl.className.replace(" active", "");
      };

      endConvEl.querySelector("#end-conversation-yes").onclick = function () {
        endConvEl.className = endConvEl.className.replace(" active", "");
        closeChat();
      };
    }
  }

  function onDomReady() {
    var interval = setInterval(function () {
      var chatContainer = document.getElementById("zammoBotUIComponent");
      if (
        chatContainer &&
        chatContainer.querySelector("#zammoBotUIComponent--chatIcon") &&
        !chatContainer.querySelector(".headerText")
      ) {
        try {
          setReshapeChatIcon();
          addRestartConversationOption(chatContainer);
          var input = chatContainer.querySelector("#zammoBotUIComponent--chatFrame--chat .msger-inputarea input");
          if (input) input.placeholder = "Type here...";

          var minimizeIcon = chatContainer.querySelector("#zammoBotUIComponent--chatFrame--header--closeIcon .mode-close");
          if (minimizeIcon) {
            minimizeIcon.innerText = "remove";
            minimizeIcon.className += " skiptranslate";
          }
        } catch (e) {
          console.error(e);
        }

        clearInterval(interval);
      }
    }, 1000);
  }

  function stopChatBotAnimation() {
    setTimeout(function () {
      var botImage = document.querySelector(".bot-image");
      var msg1 = document.querySelector(".chatbot-msg-1");
      var msg2 = document.querySelector(".chatbot-msg-2");

      if (botImage) botImage.className += " stop";
      if (msg1) msg1.className += " stop";
      if (msg2) msg2.className += " stop";
    }, 60000);
  }

  // function ZammoUIKitGetBrowserAgentExtension() {
  //   this.supportedActivity = "initiate-chatbot";
  //   this.ssoActivity = "SSO-Login";
  //   var storageKey = "zammo-eureka-processed-activity";

  //   this.canHandleInbound = function (activity) {
  //     return activity.type === this.supportedActivity || activity.type === this.ssoActivity;
  //   };

  //   this.handleInbound = function (activity, uiKitInstance) {
  //     var processed = JSON.parse(localStorage.getItem(storageKey) || "[]");
  //     if (processed.indexOf(activity.id) !== -1) return;

  //     processed.push(activity.id);
  //     localStorage.setItem(storageKey, JSON.stringify(processed));

  //     if (activity.type === this.supportedActivity) {
  //       if (isUserAuthenticated()) {
  //         getToken(function (token) {
  //           uiKitInstance.sendActivity({
  //             text: "",
  //             value: { eventType: "initiate-chatbot-proactive-response", isSuccess: true, userAuthToken: token },
  //             type: "message",
  //             channelId: "directline",
  //             from: uiKitInstance.user
  //           });
  //         });
  //       }
  //     } else if (!isUserAuthenticated()) {
  //       signIn();
  //     }
  //   };

  //   this.canHandleOutbound = function () {
  //     return false;
  //   };

  //   this.canHandleHook = function (hook) {
  //     return (
  //       hook === window.ZammoBotUIKit.ChatWidgetHooks.END_OPENING_CHATBOT ||
  //       hook === window.ZammoBotUIKit.ChatWidgetHooks.END_CLOSING_CHATBOT
  //     );
  //   };

  //   this.handleHook = function (hook) {
  //     if (hook === window.ZammoBotUIKit.ChatWidgetHooks.END_OPENING_CHATBOT) {
  //       document.body.className += " overflow-hidden";
  //     } else {
  //       document.body.className = document.body.className.replace(" overflow-hidden", "");
  //     }
  //   };
  // }

function isUserAuthenticated() {
  const cpSession = getCookieValue(CP_SESSION_KEY);
  const cpProfile = getCookieValue(CP_PROFILE_KEY);

  // return true only if both cookies are present and non-empty
  return cpSession !== "" && cpProfile !== "";
}

function getCookieValue(key) {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(key + "=")) {
      return cookie.substring(key.length + 1);
    }
  }
  return "";
}

function isTabActive() {
  return document.visibilityState === "visible" && document.hasFocus();
}

const ZammoUIKitGetBrowserAgentExtension = function (navigate) {
  this.supportedActivity = "initiate-chatbot";
  this.ssoActivity = "SSO-Login";
  this.toggleInput = "toggle-Input";

  const camiLocalStorageKey = "zammo-cami-processed-activity";
  const CAMI_IDP_TOKEN_KEY = "camiToken";

  this.canHandleInbound = function (activity) {
    return (
      activity.type === this.supportedActivity ||
      activity.type === this.ssoActivity ||
      activity.type === this.toggleInput
    );
  };

  // this.handleCamiSSOLogin = (isAutoLogin = false) => {
  //   const retryMax = 5;
  //   let retryCount = 0;

  //   //if (this.getCamiIDPToken()) return;

  //   const attemptLogin = () => {
  //     const signInButton = Array.from(
  //       document.querySelectorAll('.ac-pushButton[title="Sign in with SupportHub"]')
  //     )
  //       .reverse()
  //       .at(0);

  //     if (!signInButton) {
  //       if (++retryCount < retryMax) {
  //         setTimeout(attemptLogin, 200);
  //       }
  //       return;
  //     }

  //     if (isAutoLogin) {
  //       signInButton.click();
  //     } else {
  //       const parentMsg = signInButton.closest(".msg-group.left-msg .msg");
  //       if (parentMsg?.contains(signInButton)) {
  //          console.log("************** Inside Manual SSO Login Handler **************");
  //         toggleChatInput(false);
  //         parentMsg.id = "camiSSOFormId";
  //       }
  //     }
  //   };

  //   attemptLogin();
  // };

// this.handleCamiSSOLogin = (isAutoLogin = false) => {

//   // Example: Extract token values from wherever they are returned
//   // Replace with your actual logic
//   const sessionValue = "dummy-session-token";
//   const profileValue = "dummy-profile-token";

//   // ⭐ Set cookies using keys
//   document.cookie = `${CP_SESSION_KEY}=${sessionValue}; path=/; SameSite=Lax`;
//   document.cookie = `${CP_PROFILE_KEY}=${profileValue}; path=/; SameSite=Lax`;

//   console.log("Cookies set:", {
//     [CP_SESSION_KEY]: sessionValue,
//     [CP_PROFILE_KEY]: profileValue
//   });

//   // continue your SSO logic here...
// };

  
/*************************************************
 * FINAL Zammo-safe Chat Input Toggle
 *************************************************/

let chatInputLocked = false;

/* Public API */
function toggleChatInput(isEnabled = true) {
  // Normalize boolean (handles "false" string)
  isEnabled = isEnabled === true || isEnabled === "true";

  chatInputLocked = !isEnabled;
  console.log("[toggleChatInput] chatInputLocked =", chatInputLocked);

  applyChatInputState();
}

/* Enforce state (do NOT call directly) */
function applyChatInputState() {
  const inputBox = document.querySelector(".msger-input");
  const sendButton = document.querySelector(".msger-send-btn");
  const form = document.querySelector(".msger-inputarea");

  if (!inputBox || !sendButton || !form) return;

  if (chatInputLocked) {
    // INPUT BOX
    inputBox.style.opacity = "0.4";
    inputBox.style.pointerEvents = "none";
    inputBox.innerText = "";
    inputBox.blur();

    // SEND BUTTON
    sendButton.disabled = true;
    sendButton.style.opacity = "0.4";
    sendButton.style.pointerEvents = "none";

    // HARD BLOCK EVENTS
    inputBox.addEventListener("keydown", blockEvent, true);
    inputBox.addEventListener("input", blockEvent, true);
    form.addEventListener("submit", blockEvent, true);

    console.log("[toggleChatInput] Input & Send DISABLED");
  } else {
    // ENABLE INPUT
    inputBox.style.opacity = "1";
    inputBox.style.pointerEvents = "auto";

    // ENABLE SEND
    sendButton.disabled = false;
    sendButton.style.opacity = "1";
    sendButton.style.pointerEvents = "auto";

    // REMOVE BLOCKS
    inputBox.removeEventListener("keydown", blockEvent, true);
    inputBox.removeEventListener("input", blockEvent, true);
    form.removeEventListener("submit", blockEvent, true);

    console.log("[toggleChatInput] Input & Send ENABLED");
  }
}

/* Block user input */
function blockEvent(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  return false;
}

/* Observe Zammo re-renders */
const chatInputObserver = new MutationObserver(() => {
  if (chatInputLocked) {
    applyChatInputState();
  }
});

chatInputObserver.observe(document.body, {
  childList: true,
  subtree: true
});
/* Block user input */



  this.handleInbound = async function (activity, zammoBotUIKitInstance) {

    if (activity && activity.type === this.supportedActivity) {

      const response = {
        text: "",
        value: {
          eventType: "initiate-chatbot-proactive-response",
          isSuccess: true,

          // ⭐ Read and return cookie values using keys
          cp_session: getCookieValue(CP_SESSION_KEY),
          cp_profile: getCookieValue(CP_PROFILE_KEY),

          isUserLoggedIn: isUserAuthenticated(),
        },
        type: "message",
        channelId: "directline",
        from: zammoBotUIKitInstance.user,
      };

      if (isTabActive()) {
        zammoBotUIKitInstance.sendActivity(response);
      }
    }

  //  else if (activity?.type === this.ssoActivity) {
  //         console.log("SSO Activity triggered:", activity);   // Log activity
  //         const activityValue = activity.value;
  //         console.log("SSO Activity value:", activityValue);  // Log value

  //         // Delay to allow UI flow, then reload and call SSO login
  //         return setTimeout(() => {
  //           console.log("Calling handleCamiSSOLogin and reloading page...");
  //           // this.handleCamiSSOLogin(true);
  //           const loginUrl = `${window.location.origin}/app/utils/chatbot_login`;
  //           // Open in a new window/tab as required by client
  //           window.open(loginUrl,"_blank");
  //           // window.location.reload();
  //         }, 200);
  //       }

          else if (activity?.type === this.ssoActivity) {
          console.log("SSO Activity triggered:", activity);
          console.log("SSO Activity value:", activity.value);

          return setTimeout(() => {
            console.log("Opening chatbot_login in new window...");

           // const loginUrl = `${window.location.origin}/app/utils/chatbot_login`;

            const loginUrl = `https://sacco311connect--tst2.custhelp.com/app/utils/chatbot_login`;

            //const loginUrl = `http://localhost:4200/`;
            
            console.log("loginUrl ------------:", loginUrl);
            const loginWindow = window.open(
              loginUrl,
              "_blank"
            );

            if (!loginWindow) {
              console.warn("Popup blocked. Unable to open chatbot_login window.");
              return;
            }

            // ⏳ Wait for CP cookies to be created, then reload
            // setTimeout(() => {
            //   console.log("Reloading page after waiting for CP session creation...");
            //   window.location.reload();
            // }, 3000); // 3 seconds (increase to 4–5 if needed)

          }, 200);
        }

        else if (activity?.type === this.toggleInput) {
          console.log("Toggle Activity triggered:", activity);   // Log activity
          const activityValue = activity.value;
          console.log("Toggle Activity value:", activityValue);  // Log value

          toggleChatInput(activityValue);
        }
  };

  this.canHandleOutbound = () => false;

  this.canHandleHook = function (hookName) {
    return (
      hookName === window.ZammoBotUIKit.ChatWidgetHooks.END_OPENING_CHATBOT ||
      hookName === window.ZammoBotUIKit.ChatWidgetHooks.END_CLOSING_CHATBOT
    );
  };

  this.handleHook = function (hookName) {
    if (hookName === window.ZammoBotUIKit.ChatWidgetHooks.END_OPENING_CHATBOT) {
      document.body.classList.add("overflow-hidden");
    } else if (
      hookName === window.ZammoBotUIKit.ChatWidgetHooks.END_CLOSING_CHATBOT
    ) {
      document.body.classList.remove("overflow-hidden");
    }
  };

  return this;
};



  function loadWebChat() {
    var script = document.createElement("script");
    script.id = "ZammoBotUIKitScript";
    script.src = appConfig.WEB_CHAT_JS_URL;
    script.setAttribute("webChatId", appConfig.WEB_CHAT_ID);
    script.setAttribute("zammoApiBaseUrl", appConfig.WEB_CHAT_BASE_URL);
    script.setAttribute("executionType", "controlled");
    script.setAttribute("stickyChat", "true");
    script.setAttribute("ttl", appConfig.WEB_CHAT_SESSION_TTL);
    script.setAttribute("cssUrl", appConfig.WEB_CHAT_CSS_URL);
    script.setAttribute("simulatorToken", "9z8E0ovg_FiEBfzv3RXg7tLdxXDrnJCIwdEaDPJH6Hc");
    script.async = true;
    script.defer = true;
   
    script.onload = function () {
      window.ZammoBotUIKit.Extensions.push(new ZammoUIKitGetBrowserAgentExtension());
      var chatBotInstance = window.ZammoBotUIKit.initialize();
      chatBotInstance.run(appConfig.WEB_CHAT_ID);
      window.chatBotInstance = chatBotInstance;
      onDomReady();
      var oldReset = window.chatBotInstance.resetSession;
      window.chatBotInstance.resetSession = function () {
        // chatBotInstance.sendActivity({ type: "UserEvent", name: "eventResetLiveAgent" });
        oldReset.call(window.chatBotInstance);
      };
    };
    
// script.onload = function () {
//   window.ZammoBotUIKit.Extensions.push(new ZammoUIKitGetBrowserAgentExtension());

//   var chatBotInstance = window.ZammoBotUIKit.initialize();

//   // ✅ Initial bot data goes here
//   chatBotInstance.initialBotData = JSON.stringify({
//     locale: "es",
//     userName: "manish",
//   });

//   chatBotInstance.run(appConfig.WEB_CHAT_ID);
//   window.chatBotInstance = chatBotInstance;

//   onDomReady();

//   var oldReset = window.chatBotInstance.resetSession;
//   window.chatBotInstance.resetSession = function () {
//     oldReset.call(window.chatBotInstance);
//   };
// };
      

    document.body.appendChild(script);
    stopChatBotAnimation();
  }

 

  if (document.readyState !== "loading") {
    loadWebChat();
  } else {
    document.addEventListener("DOMContentLoaded", loadWebChat);
  }
})();


