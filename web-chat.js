(function () {


  var appConfig = {
    WEB_CHAT_JS_URL: "https://nonprdzammostormhzvq.blob.core.windows.net/zammo-bot-ui-kit/zammo-bot-ui-kit-0.13.0.min.js",
    WEB_CHAT_ID: "00000000-0000-0000-0000-000000000000",
    WEB_CHAT_BASE_URL: "https://app.zammo.ai",
    WEB_CHAT_SESSION_TTL: "3600",
    WEB_CHAT_CSS_URL: "https://nonprdzammostormhzvq.blob.core.windows.net/zammo-bot-ui-kit/zammo-bot-ui-kit-0.13.0.min.css",
    ASSET_URL: "https://cdn.jsdelivr.net/gh/manish7dude/bot@main/images"
  };


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

  function signIn() {
    window.location.href = "/login";
  }

  function setReshapeChatIcon() {
  var chatIconHtml = `
    <div class="bottom-container">
      <div class="chat-text-scroll">
        <span>Hey there!</span>
      </div>
      <div class="chat-icon">
        <img src="${appConfig.ASSET_URL}/sacramento.png" alt="Chat Icon">
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
     camiIconEl.innerHTML = `
  <img class="bot-icon" src="${appConfig.ASSET_URL}/sacramento.png" alt="Cami Icon" />
  <span class="bot-title">Cami</span>
`;
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

  function ZammoUIKitGetBrowserAgentExtension() {
    this.supportedActivity = "initiate-chatbot";
    this.ssoActivity = "SSO-Login";
    var storageKey = "zammo-eureka-processed-activity";

    this.canHandleInbound = function (activity) {
      return activity.type === this.supportedActivity || activity.type === this.ssoActivity;
    };

    this.handleInbound = function (activity, uiKitInstance) {
      var processed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (processed.indexOf(activity.id) !== -1) return;

      processed.push(activity.id);
      localStorage.setItem(storageKey, JSON.stringify(processed));

      if (activity.type === this.supportedActivity) {
        if (isUserAuthenticated()) {
          getToken(function (token) {
            uiKitInstance.sendActivity({
              text: "",
              value: { eventType: "initiate-chatbot-proactive-response", isSuccess: true, userAuthToken: token },
              type: "message",
              channelId: "directline",
              from: uiKitInstance.user
            });
          });
        }
      } else if (!isUserAuthenticated()) {
        signIn();
      }
    };

    this.canHandleOutbound = function () {
      return false;
    };

    this.canHandleHook = function (hook) {
      return (
        hook === window.ZammoBotUIKit.ChatWidgetHooks.END_OPENING_CHATBOT ||
        hook === window.ZammoBotUIKit.ChatWidgetHooks.END_CLOSING_CHATBOT
      );
    };

    this.handleHook = function (hook) {
      if (hook === window.ZammoBotUIKit.ChatWidgetHooks.END_OPENING_CHATBOT) {
        document.body.className += " overflow-hidden";
      } else {
        document.body.className = document.body.className.replace(" overflow-hidden", "");
      }
    };
  }

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
    script.setAttribute("simulatorToken", "CsCHsIgvuIxGeLGqF_LsfAZ95bPZDhyunfPfyhcVPkM");
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

    document.body.appendChild(script);
    stopChatBotAnimation();
  }

  if (document.readyState !== "loading") {
    loadWebChat();
  } else {
    document.addEventListener("DOMContentLoaded", loadWebChat);
  }
})();


