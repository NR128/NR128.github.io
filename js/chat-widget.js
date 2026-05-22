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
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        .n8n-chat-widget .chat-faq-container {
            padding: 10px 16px;
            display: flex;
            flex-wrap: wrap;
            gap: 6px 8px;
            background: #f8fafc;
            border-top: 1px solid rgba(92, 107, 192, 0.08);
            border-bottom: 1px solid rgba(92, 107, 192, 0.05);
        }

        .n8n-chat-widget .faq-btn {
            background: white;
            border: 1px solid rgba(92, 107, 192, 0.15);
            border-radius: 16px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 500;
            color: #475569;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
            font-family: inherit;
        }

        .n8n-chat-widget .faq-btn:hover {
            background: #e0e7ff;
            border-color: var(--chat--color-primary);
            color: var(--chat--color-primary);
            transform: translateY(-1px);
        }

        @media (max-width: 450px) {
            .n8n-chat-widget .chat-container {
                width: calc(100% - 32px);
                height: calc(100% - 110px);
                bottom: 85px;
            }
            .n8n-chat-widget .chat-container:not(.position-left) {
                right: 16px;
            }
            .n8n-chat-widget .chat-container.position-left {
                left: 16px;
            }
            .n8n-chat-widget .chat-toggle:not(.position-left) {
                right: 16px;
                bottom: 16px;
            }
            .n8n-chat-widget .chat-toggle.position-left {
                left: 16px;
                bottom: 16px;
            }
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
            <div class="chat-faq-container">
                <button class="faq-btn" data-faq="tech">🛠️ 기술 스택</button>
                <button class="faq-btn" data-faq="experience">💼 주요 경력</button>
                <button class="faq-btn" data-faq="projects">📁 주요 프로젝트</button>
                <button class="faq-btn" data-faq="strengths">💡 핵심 강점</button>
                <button class="faq-btn" data-faq="contact">📞 연락처 & 링크</button>
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

    // Helper to format bot message text (handles bold, links, lists, and newlines)
    function formatMessageText(text) {
        if (!text) return '';
        // Escape HTML to prevent XSS
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        // Bold: **text**
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Link: [text](url)
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: var(--chat--color-primary); text-decoration: underline; font-weight: 500;">$1</a>');
        
        // Bullet points: - item (matching at start of string or after a newline with optional spaces)
        html = html.replace(/(?:^|\n)(\s*)-\s+(.*?)(?=$|\n)/g, function(match, spaces, p1) {
            const prefix = match.startsWith('\n') ? '\n' : '';
            const indent = spaces ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '';
            return prefix + indent + '• ' + p1;
        });
        
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }

    const faqData = {
        tech: {
            question: "기술 스택은 어떻게 되시나요?",
            answer: "**🛠️ 기술 스택 (Tech Stack)**\n\n" +
                    "- **언어**: 파이썬 (Python)\n" +
                    "- **라이브러리**: Pandas (판다스), Matplotlib, Seaborn\n" +
                    "- **도구**: Tableau (태블로), Google Colab, Git/GitHub, VS Code\n\n" +
                    "데이터 가공 및 전처리부터 인터랙티브한 시각화 대시보드 구축까지 가능한 기술 역량을 가지고 있습니다."
        },
        experience: {
            question: "주요 경력에 대해 알려주세요.",
            answer: "**💼 주요 경력 (Experience)**\n\n" +
                    "- **AX 융합 교육 과정 이수** (2026 ~ 현재)\n" +
                    "  - 데이터 분석 및 생성형 AI 비즈니스 응용 교육 과정 참가\n" +
                    "  - 주요 IT 기업(당근, 채널코퍼레이션, 무신사 등)의 비즈니스 모델 분석 및 자동화 제안서 작성\n" +
                    "  - n8n, LLM을 활용한 업무 자동화 워크플로우 설계 및 구현\n" +
                    "- **데이터 분석 및 시각화 프로젝트 경험**\n" +
                    "  - 소셜 마케팅 성과 분석 및 소비자 소비 성향 트렌드 데이터 분석 진행"
        },
        projects: {
            question: "진행했던 주요 프로젝트를 보여주세요.",
            answer: "**📁 주요 프로젝트 (Projects)**\n\n" +
                    "1. **인스타그램 인플루언서 광고 효율 데이터 분석**\n" +
                    "- **내용**: 인플루언서 광고 성과 데이터를 수집 및 분석하여 광고 효율을 분석한 프로젝트입니다.\n" +
                    "- **바로가기**: [인스타그램 프로젝트 포스트](post.html?post=project-01-instagram) / [GitHub 저장소](https://github.com/NR128/project_01_instagram_influencer_analysis.git)\n\n" +
                    "2. **소비자 쇼핑 트렌드 분석 (Consumer Shopping Trends)**\n" +
                    "- **내용**: 연령 및 소득 수준별 소비 패턴을 다각도로 분석하여 맞춤형 마케팅 전략과 비즈니스 인사이트를 도출한 프로젝트입니다.\n" +
                    "- **바로가기**: [쇼핑 트렌드 분석 포스트](post.html?post=consumer-shopping-trends)"
        },
        strengths: {
            question: "핵심 강점은 무엇인가요?",
            answer: "**💡 핵심 강점 (Key Strengths)**\n\n" +
                    "- **데이터 기반 비즈니스 인사이트**: 단순 데이터 분석을 넘어 비즈니스 지표 개선을 위한 실질적인 액션 아이템을 도출합니다.\n" +
                    "- **비즈니스 시각화 (Tableau)**: 복잡한 데이터 흐름을 대시보드로 시각화하여 설득력 있는 의사결정을 지원합니다.\n" +
                    "- **업무 자동화 및 RAG 활용**: n8n 등 자동화 도구와 LLM/RAG 패턴을 학습하여 업무 효율을 극대화하는 방안을 모색합니다."
        },
        contact: {
            question: "연락처 및 관련 링크를 알려주세요.",
            answer: "**📞 연락처 & 링크 (Contact & Links)**\n\n" +
                    "- **GitHub**: [NR128 GitHub Profile](https://github.com/NR128)\n" +
                    "- **홈페이지**: [NR's Tech Space 홈으로 이동](index.html)\n\n" +
                    "궁금한 점이 있으시다면 언제든 편하게 연락해 주세요! 😊"
        }
    };

    // Select FAQ buttons and bind click event
    const faqButtons = chatContainer.querySelectorAll('.faq-btn');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqKey = button.getAttribute('data-faq');
            if (faqData[faqKey]) {
                handleFAQClick(faqKey);
            }
        });
    });

    async function handleFAQClick(faqKey) {
        const item = faqData[faqKey];
        if (!item) return;

        // 1. Display user question
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = item.question;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 2. Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Disable FAQ buttons while responding
        faqButtons.forEach(btn => btn.style.pointerEvents = 'none');

        // 3. Simulate delayed response (600ms)
        setTimeout(() => {
            typingDiv.remove();

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.innerHTML = formatMessageText(item.answer);
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Re-enable FAQ buttons
            faqButtons.forEach(btn => btn.style.pointerEvents = 'auto');
        }, 600);
    }

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

            botMessageDiv.innerHTML = formatMessageText(botText);
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
