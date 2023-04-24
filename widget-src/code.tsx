import {MessageRow} from './MessageRow'

const {widget} = figma
const {
	AutoLayout,
	Frame,
	Text,
	Input,
	Line,
	Rectangle,
	SVG,
	useSyncedMap,
	usePropertyMenu,
	useEffect,
	waitForTask,
	useSyncedState
} = widget

export type ChatMessage = {
	role: string
	content: string
	expanded: boolean
}

const SampleMessages: ChatMessage[] = [
	{role: 'user', content: 'Hi', expanded: true},
	{role: 'assistant', content: 'Hello!', expanded: true}
]

function FigChat() {
	const [messages, setMessages] = useSyncedState<ChatMessage[]>(
		'messages',
		SampleMessages
	)

	const [titleVisible, setTitleVisible] = useSyncedState<boolean>(
		'titleVisible',
		false
	)
	const [title, setTitle] = useSyncedState('title', '')

	const [systemMessageVisible, setSystemMessageVisible] =
		useSyncedState<boolean>('systemMessageVisible', false)
	const [systemMessage, setSystemMessage] = useSyncedState<
		ChatMessage & {
			role: 'system'
		}
	>('systemMessage', {role: 'system', content: '', expanded: true})

	const [keyVisible, setKeyVisible] = useSyncedState<boolean>(
		'keyVisible',
		false
	)
	const [keyMessage, setKeyMessage] = useSyncedState<
		ChatMessage & {
			role: 'OpenAI Key'
		}
	>('key', {role: 'OpenAI Key', content: '', expanded: true})
	const [anthropicKeyMessage, setAnthropicKeyMessage] = useSyncedState<
		ChatMessage & {
			role: 'Claude Key'
		}
	>('anthropicKey', {role: 'Claude Key', content: '', expanded: true})

	const [loadState, setLoadState] = useSyncedState<
		'ready' | 'loading' | 'error'
	>('loadState', 'ready')
	const [error, setError] = useSyncedState<Record<string, string>>(
		'error',
		{}
	)

	const [model, setModel] = useSyncedState('model', 'gpt-4')
	const [temp, setTemp] = useSyncedState('temp', '0.7')
	const [topP, setTopP] = useSyncedState('top_p', '1')
	const [widened, setWidened] = useSyncedState('widened', false)
	const [color, setColor] = useSyncedState('color', '#ffffff')

	const isGPT = () => model.startsWith('gpt')

	usePropertyMenu(
		[
			{
				propertyName: 'model',
				itemType: 'dropdown',
				tooltip: 'Model',
				options: [
					{
						option: 'gpt-4',
						label: 'GPT-4'
					},
					{
						option: 'gpt-3.5-turbo',
						label: 'GPT-3.5'
					},
					{
						option: 'claude-v1',
						label: 'Claude v1'
					},
					{
						option: 'claude-instant-v1',
						label: 'Claude Instant v1'
					}
				],
				selectedOption: model
			},
			{itemType: 'separator'},
			{
				propertyName: 'temp',
				itemType: 'dropdown',
				tooltip: 'Temp',
				options: [
					{
						option: '0',
						label: '0'
					},
					{
						option: '0.1',
						label: '0.1'
					},
					{
						option: '0.2',
						label: '0.2'
					},
					{
						option: '0.3',
						label: '0.3'
					},
					{
						option: '0.4',
						label: '0.4'
					},
					{
						option: '0.5',
						label: '0.5'
					},
					{
						option: '0.6',
						label: '0.6'
					},

					{
						option: '0.7',
						label: '0.7'
					},
					{
						option: '0.8',
						label: '0.8'
					},
					{
						option: '0.9',

						label: '0.9'
					},
					{
						option: '1',
						label: '1'
					}
				],
				selectedOption: temp
			},
			{
				propertyName: 'top_p',
				itemType: 'dropdown',
				tooltip: 'Top P',
				options: [
					{
						option: '0',
						label: '0'
					},
					{
						option: '0.1',
						label: '0.1'
					},
					{
						option: '0.2',
						label: '0.2'
					},
					{
						option: '0.3',
						label: '0.3'
					},
					{
						option: '0.4',
						label: '0.4'
					},
					{
						option: '0.5',
						label: '0.5'
					},
					{
						option: '0.6',
						label: '0.6'
					},

					{
						option: '0.7',
						label: '0.7'
					},
					{
						option: '0.8',
						label: '0.8'
					},
					{
						option: '0.9',

						label: '0.9'
					},
					{
						option: '1',
						label: '1'
					}
				],
				selectedOption: topP
			},
			{itemType: 'separator'},
			{
				propertyName: 'toggleTitle',
				itemType: 'toggle',
				tooltip: 'Toggle Title',
				isToggled: titleVisible,
				icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`
			},
			{
				propertyName: 'toggleSystem',
				itemType: 'toggle',
				tooltip: 'Toggle System Message',
				isToggled: systemMessageVisible,
				icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="2" x2="9" y2="4"></line><line x1="15" y1="2" x2="15" y2="4"></line><line x1="9" y1="21" x2="9" y2="22"></line><line x1="15" y1="20" x2="15" y2="22"></line><line x1="20" y1="9" x2="22" y2="9"></line><line x1="20" y1="14" x2="22" y2="14"></line><line x1="2" y1="9" x2="4" y2="9"></line><line x1="2" y1="14" x2="4" y2="14"></line></svg>`
			},
			{
				propertyName: 'toggleKey',
				itemType: 'toggle',
				tooltip: `Toggle ${isGPT() ? 'OpenAI' : 'Anthropic'} Key`,
				isToggled: keyVisible,
				icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>`
			},
			{itemType: 'separator'},
			{
				propertyName: 'expandCollapse',
				itemType: 'action',
				tooltip: [systemMessage, ...messages].some(
					(msg) => msg.expanded
				)
					? 'Collapse All Messages'
					: 'Expand All Messages',
				icon: [systemMessage, ...messages].some((msg) => msg.expanded)
					? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-down-up"><path d="m7 20 5-5 5 5"></path><path d="m7 4 5 5 5-5"></path></svg>`
					: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg>`
			},
			{
				propertyName: 'widenNarrow',
				itemType: 'action',
				tooltip: widened ? 'Narrow Chat' : 'Widen Chat',
				icon: widened
					? `<?xml version="1.0" encoding="UTF-8"?><svg width="20px" height="20px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="white"><path d="M7 9.5L9.5 12 7 14.5M16.5 9.5L14 12l2.5 2.5" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 5h12a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4V9a4 4 0 014-4z" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
					: `<?xml version="1.0" encoding="UTF-8"?><svg width="20px" height="20px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="white"><path d="M8.5 9.5L6 12l2.5 2.5M15.5 9.5L18 12l-2.5 2.5" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 15V9a4 4 0 014-4h12a4 4 0 014 4v6a4 4 0 01-4 4H6a4 4 0 01-4-4z" stroke="white" stroke-width="1"></path></svg>`
			},
			{
				itemType: 'color-selector',
				propertyName: 'color',
				tooltip: 'Chat Color',
				options: [
					{tooltip: 'Red', option: '#F24822'},
					{tooltip: 'Yellow', option: '#FFCD29'},
					{tooltip: 'Green', option: '#14AE5C'},
					{tooltip: 'Blue', option: '#0D99FF'},
					{tooltip: 'Purple', option: '#9747FF'},
					{tooltip: 'Orange', option: '#FFA629'},
					{tooltip: 'Gray', option: '#B3B3B3'},
					{tooltip: 'Default', option: '#ffffff'}
				],
				selectedOption: color
			},
			{itemType: 'separator'},
			{
				propertyName: 'resetChat',
				itemType: 'action',
				tooltip: 'Reset Chat',
				icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v6h6"></path><path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path></svg>`
			}
		],
		async ({propertyName, propertyValue}) => {
			switch (propertyName) {
				case 'toggleTitle':
					setTitleVisible((v) => !v)
					break
				case 'toggleSystem':
					setSystemMessageVisible((v) => !v)
					break
				case 'toggleKey':
					setKeyVisible((v) => !v)
					break
				case 'resetChat':
					setMessages(SampleMessages)
					break
				case 'expandCollapse':
					setSystemMessage((msg) => ({
						...msg,
						expanded: ![systemMessage, ...messages].some(
							(msg) => msg.expanded
						)
					}))
					setMessages((messages) =>
						messages.map((msg) => ({
							...msg,
							expanded: ![systemMessage, ...messages].some(
								(msg) => msg.expanded
							)
						}))
					)
					break
				case 'widenNarrow':
					setWidened((v) => !v)
					break
				case 'color':
					if (propertyValue !== undefined) setColor(propertyValue)
					break
				case 'model':
					if (propertyValue !== undefined) {
						// Update model
						setModel(propertyValue)

						// If we're switching between GPT and Claude with default temps set, update the temp
						if (
							model.includes('gpt') &&
							!propertyValue.includes('gpt')
						) {
							// GPT to Claude
							if (temp === '0.7') setTemp('1')
						} else if (
							// Claude to GPT
							!model.includes('gpt') &&
							propertyValue.includes('gpt')
						) {
							if (temp === '1') setTemp('0.7')
						}
					}
					break
				case 'temp':
					if (propertyValue !== undefined) setTemp(propertyValue)
					break
				case 'topP':
					if (propertyValue !== undefined) setTopP(propertyValue)
					break
			}
		}
	)

	const addMessage = () => {
		setMessages([
			...messages,
			{
				role:
					messages[messages.length - 1]?.role === 'user'
						? 'assistant'
						: 'user',
				content: '',
				expanded: true
			}
		])
	}

	const cancel = async () => {
		setLoadState('ready')
		figma.ui.postMessage({type: 'cancel'})
	}

	const submit = async () => {
		const stream = true
		setLoadState('loading')
		waitForTask(
			new Promise((resolve) => {
				figma.showUI(__html__, {visible: false})
				figma.ui.postMessage({
					type: stream ? 'submit-stream' : 'submit',
					messages: systemMessage.content
						? [systemMessage, ...messages]
						: messages,
					key: keyMessage.content,
					temp: +temp,
					topP: +topP,
					model
				})

				if (stream) {
					// STREAMING
					figma.ui.onmessage = async (response: {
						messages?: ChatMessage[]
						error?: Record<string, string>
						state?: 'streaming' | 'complete'
					}) => {
						if (response.error) {
							setLoadState('error')
							setError(response.error)
							// @ts-ignore
							resolve()
						} else if (response.messages) {
							setMessages(response.messages)
							if (response.state === 'complete') {
								setLoadState('ready')
								// @ts-ignore
								resolve()
							}
						}
					}
				}

				if (!stream) {
					// NON-STREAMING
					figma.ui.onmessage = async (response: {
						assistantMessage?: string
						error?: Record<string, string>
					}) => {
						if (response.error) {
							setLoadState('error')
							setError(response.error)
						} else if (response.assistantMessage) {
							const newMessages = [
								...messages,
								{
									role: 'assistant',
									content: response.assistantMessage,
									expanded: true
								}
							]
							setMessages(newMessages)
							setLoadState('ready')
						}
						// @ts-ignore
						resolve()
					}
				}
			})
		)
	}

	return (
		<AutoLayout
			direction="vertical"
			width="hug-contents"
			spacing={12}
			padding={{top: 15, bottom: 12, left: 12, right: 12}}
			fill="#fff"
			cornerRadius={8}
			stroke={color ?? {r: 0, g: 0, b: 0, a: 0.08}}
			strokeWidth={color ? 4 : 1}
			effect={{
				type: 'drop-shadow',
				color: {r: 0, g: 0, b: 0, a: 0.06},
				offset: {x: 0, y: 4},
				blur: 15
			}}
			horizontalAlignItems="center"
		>
			{titleVisible && (
				<AutoLayout
					direction="vertical"
					width="fill-parent"
					horizontalAlignItems="center"
					spacing={24}
					padding={{top: 6}}
				>
					<Input
						width={320}
						value={title}
						onTextEditEnd={(e) => setTitle(e.characters)}
						placeholder="Chat"
						horizontalAlignText="center"
						fontSize={20}
						fill={color ?? '#000000'}
					/>
					<Line
						stroke="#000000"
						strokeWidth={1}
						opacity={0.08}
						length="fill-parent"
					/>
				</AutoLayout>
			)}
			{keyVisible && (
				<MessageRow
					message={keyMessage}
					expandable={false}
					deleteable={false}
					placeholder={isGPT() ? 'OpenAI Key' : 'API Key'}
					widened={widened}
					roleWidth={isGPT() ? 83 : 70}
					roleColor="#A953FE"
					monospace={true}
					onUpdateContent={(content: string) => {
						setKeyMessage({...keyMessage, content})
					}}
					onExpandCollapse={(expanded: boolean) => {
						setKeyMessage({...keyMessage, expanded})
					}}
				/>
			)}
			{systemMessageVisible && (
				<MessageRow
					message={systemMessage}
					expandable={true}
					deleteable={false}
					placeholder="System Message"
					widened={widened}
					roleWidth={57}
					roleColor="#A953FE"
					onUpdateContent={(content: string) => {
						setSystemMessage({...systemMessage, content})
					}}
					onExpandCollapse={(expanded: boolean) => {
						setSystemMessage({...systemMessage, expanded})
					}}
				/>
			)}
			{messages.map((message, index) => (
				<MessageRow
					message={message}
					index={index}
					expandable={true}
					deleteable={true}
					placeholder="Message"
					widened={widened}
					roleWidth={message.role === 'user' ? 36 : 78}
					onUpdateContent={(content: string) => {
						const newMessages = [...messages]
						newMessages[index].content = content
						setMessages(newMessages)
					}}
					onDelete={() => {
						const newMessages = [...messages]
						newMessages.splice(index, 1)
						setMessages(newMessages)
					}}
					onExpandCollapse={(expanded: boolean) => {
						const newMessages = [...messages]
						newMessages[index].expanded = expanded
						setMessages(newMessages)
					}}
					onToggleRole={(role: string) => {
						const newMessages = [...messages]
						newMessages[index].role = role
						setMessages(newMessages)
					}}
				/>
			))}
			<AutoLayout
				direction="horizontal"
				width="fill-parent"
				spacing="auto"
			>
				<AutoLayout
					direction="horizontal"
					spacing={8}
					padding={{vertical: 6, horizontal: 8}}
					cornerRadius={4}
					hoverStyle={{
						fill: '#F5ECFF'
					}}
					onClick={addMessage}
				>
					<SVG
						src={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A953FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`}
					/>
					<Text
						fontFamily="Inter"
						fontSize={13}
						letterSpacing={0.1}
						horizontalAlignText="left"
						verticalAlignText="center"
						fill="#A953FE"
						height={20}
						fontWeight={600}
					>
						Add message
					</Text>
				</AutoLayout>
				<AutoLayout
					cornerRadius={4}
					fill={
						loadState === 'loading'
							? '#CB0909'
							: keyMessage.content
							? '#A953FE'
							: {r: 0, g: 0, b: 0, a: 0.2}
					}
					onClick={
						keyMessage.content
							? loadState !== 'loading'
								? submit
								: cancel
							: undefined
					}
					verticalAlignItems="center"
					horizontalAlignItems="center"
					padding={{vertical: 6, horizontal: 8}}
					spacing={6}
					hoverStyle={
						keyMessage.content
							? {
									fill:
										loadState === 'loading'
											? '#B50808'
											: '#832DDA'
							  }
							: {}
					}
					tooltip={
						keyMessage.content ? '' : 'Enter your OpenAI Key first'
					}
				>
					{loadState !== 'loading' && (
						<SVG
							src={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`}
						/>
					)}
					{loadState === 'loading' && (
						<SVG
							src={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`}
						/>
					)}
					<Text
						fontFamily="Inter"
						fontSize={14}
						horizontalAlignText="center"
						verticalAlignText="center"
						fill="#fff"
						fontWeight={600}
					>
						{loadState === 'loading' ? 'Cancel' : 'Submit'}
					</Text>
				</AutoLayout>
			</AutoLayout>
			{loadState === 'error' && (
				<AutoLayout
					direction="vertical"
					spacing={8}
					padding={{vertical: 16, bottom: 10, horizontal: 8}}
					cornerRadius={4}
					width="fill-parent"
					horizontalAlignItems={'center'}
					stroke="#ff0000"
				>
					<SVG
						src={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`}
					/>
					<Text
						fontFamily="Inter"
						fontSize={13}
						letterSpacing={0.1}
						horizontalAlignText="center"
						verticalAlignText="center"
						fill="#ff0000"
						width={360}
					>
						{error.message}
					</Text>
					<AutoLayout
						direction="horizontal"
						spacing={8}
						padding={{vertical: 6, horizontal: 8}}
						cornerRadius={4}
						hoverStyle={{
							fill: '#FFE5E5'
						}}
						onClick={() => setLoadState('ready')}
					>
						<Text
							fontFamily="Inter"
							fontSize={13}
							letterSpacing={0.1}
							horizontalAlignText="left"
							verticalAlignText="center"
							fill="#ff0000"
							height={20}
							fontWeight={600}
						>
							OK
						</Text>
					</AutoLayout>
				</AutoLayout>
			)}
		</AutoLayout>
	)
}

widget.register(FigChat)
