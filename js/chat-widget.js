// Custom n8n Chat Widget Script for NR's Tech Space
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #5c6bc0);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #3f51b5);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #1e293b);
            font-family: 'Outfit', 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 90px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 580px;
            background: var(--chat--color-background);
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(92, 107, 192, 0.2);
            border: 1px solid rgba(92, 107, 192, 0.15);
            overflow: hidden;
            font-family: inherit;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
            animation: chatFadeIn 0.3s ease;
        }

        @keyframes chatFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .n8n-chat-widget .brand-header {
            padding: 18px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            opacity: 0.8;
            transition: opacity 0.2s;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: white;
            padding: 2px;
            object-fit: cover;
        }

        .n8n-chat-widget .brand-header .header-info {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header .header-info span {
            font-size: 16px;
            font-weight: 600;
        }

        .n8n-chat-widget .brand-header .header-info p {
            font-size: 11px;
            margin: 0;
            opacity: 0.8;
        }

        .n8n-chat-widget .chat-interface {
            display: flex;
            flex-direction: column;
            height: 100%;
            background: #f8fafc;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 85%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
            box-shadow: 0 4px 12px rgba(92, 107, 192, 0.2);
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            border: 1px solid rgba(92, 107, 192, 0.1);
            color: var(--chat--color-font);
            align-self: flex-start;
            border-bottom-left-radius: 2px;
        }

        .n8n-chat-widget .chat-message.bot.typing {
            color: #64748b;
            font-style: italic;
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 8px 16px;
        }

        .n8n-chat-widget .chat-message.bot.typing span {
            width: 6px;
            height: 6px;
            background-color: #64748b;
            border-radius: 50%;
            display: inline-block;
            animation: bounce 1.4s infinite both;
        }

        .n8n-chat-widget .chat-message.bot.typing span:nth-child(1) { animation-delay: -0.32s; }
        .n8n-chat-widget .chat-message.bot.typing span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: white;
            border-top: 1px solid rgba(92, 107, 192, 0.1);
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid rgba(92, 107, 192, 0.2);
            border-radius: 20px;
            background: #f8fafc;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            max-height: 80px;
            outline: none;
            transition: border-color 0.2s, background-color 0.2s;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            border-color: var(--chat--color-primary);
            background-color: white;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
            flex-shrink: 0;
            padding: 0;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-input button svg {
            width: 18px;
            height: 18px;
            margin-left: 2px;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(92, 107, 192, 0.4);
            z-index: 999;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.08);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget .chat-toggle.open svg {
            transform: rotate(90deg);
        }

        .n8n-chat-widget .chat-footer {
            padding: 6px 12px;
            text-align: center;
            background: white;
            border-top: 1px solid rgba(92, 107, 192, 0.05);
        }

        .n8n-chat-widget .chat-footer a {
            color: #94a3b8;
            text-decoration: none;
            font-size: 11px;
            transition: color 0.2s;
        }

        .n8n-chat-widget .chat-footer a:hover {
            color: var(--chat--color-primary);
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: 'AI Assistant',
            welcomeText: '안녕하세요! 궁금한 점을 물어보세요 😊',
            responseTimeText: '보통 바로 답변드려요',
            poweredBy: {
                text: 'Powered by n8n',
                link: 'https://n8n.io'
            }
        },
        style: {
            primaryColor: '#5c6bc0',
            secondaryColor: '#3f51b5',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#1e293b'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    // Generate session ID immediately
    let currentSessionId = crypto.randomUUID();

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    // Logo element if logo URL is provided, otherwise empty
    const logoHTML = config.branding.logo ? `<img src="${config.branding.logo}" alt="${config.branding.name}">` : '';

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                ${logoHTML}
                <div class="header-info">
                    <span>${config.branding.name}</span>
                    <p>${config.branding.responseTimeText}</p>
                </div>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages">
                <!-- Welcome Message is added dynamically -->
            </div>
            <div class="chat-input">
                <textarea placeholder="메시지를 입력하세요..." rows="1"></textarea>
                <button type="submit" title="보내기">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = chatInterfaceHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    // Add welcome message immediately to the message area
    function addWelcomeMessage() {
        const welcomeMessageDiv = document.createElement('div');
        welcomeMessageDiv.className = 'chat-message bot';
        welcomeMessageDiv.textContent = config.branding.welcomeText;
        messagesContainer.appendChild(welcomeMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    addWelcomeMessage();

    // Auto resize textarea
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight - 4) + 'px';
    });

    async function sendMessage(message) {
        // Render user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Render typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Remove typing indicator
            typingDiv.remove();

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            
            // Parse response
            let botText = '';
            if (Array.isArray(data)) {
                botText = data[0].output || data[0].text || data[0].response || JSON.stringify(data[0]);
            } else if (data && typeof data === 'object') {
                botText = data.output || data.text || data.response || JSON.stringify(data);
            } else {
                botText = data || '응답을 받지 못했습니다.';
            }

            botMessageDiv.textContent = botText;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            typingDiv.remove();
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot';
            errorDiv.style.color = '#e11d48';
            errorDiv.style.borderColor = '#fecdd3';
            errorDiv.style.backgroundColor = '#fff1f2';
            errorDiv.textContent = '메시지를 전송하지 못했습니다. n8n 서버 연결 및 CORS 설정을 확인해 주세요.';
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    function handleSend() {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
            textarea.style.height = 'auto';
        }
    }
    
    sendButton.addEventListener('click', handleSend);
    
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
    
    toggleButton.addEventListener('click', () => {
        const isOpen = chatContainer.classList.toggle('open');
        toggleButton.classList.toggle('open', isOpen);
    });

    const closeButton = chatContainer.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        chatContainer.classList.remove('open');
        toggleButton.classList.remove('open');
    });
})();
