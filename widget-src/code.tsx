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

const SampleMessages = [
	{role: 'user', content: 'Hi'},
	{role: 'assistant', content: 'Hello!'}
]

function FableChat() {
	const [messages, setMessages] = useSyncedState<
		{role: string; content: string}[]
	>('messages', SampleMessages)

	const [titleVisible, setTitleVisible] = useSyncedState<boolean>(
		'titleVisible',
		false
	)
	const [title, setTitle] = useSyncedState('title', '')

	const [systemMessageVisible, setSystemMessageVisible] =
		useSyncedState<boolean>('systemMessageVisible', false)
	const [systemMessage, setSystemMessage] = useSyncedState<{
		role: 'system'
		content: string
	}>('systemMessage', {role: 'system', content: ''})

	const [keyVisible, setKeyVisible] = useSyncedState<boolean>(
		'keyVisible',
		false
	)
	const [keyMessage, setKeyMessage] = useSyncedState<{
		role: 'OpenAI Key'
		content: string
	}>('key', {role: 'OpenAI Key', content: ''})

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
				tooltip: 'Toggle OpenAI Key',
				isToggled: keyVisible,
				icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>`
			},

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
				case 'model':
					if (propertyValue !== undefined) setModel(propertyValue)
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
				content: ''
			}
		])
	}

	const cancel = async () => {
		setLoadState('ready')
		figma.ui.postMessage({type: 'cancel'})
	}

	const submit = async () => {
		setLoadState('loading')
		waitForTask(
			new Promise((resolve) => {
				figma.showUI(__html__, {visible: false})
				figma.ui.postMessage({
					type: 'submit',
					messages: systemMessage.content
						? [systemMessage, ...messages]
						: messages,
					key: keyMessage.content,
					temp: +temp,
					topP: +topP,
					model
				})

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
								content: response.assistantMessage
							}
						]
						setMessages(newMessages)
						setLoadState('ready')
					}
					// @ts-ignore
					resolve()
				}

				// STREAMING
				// figma.ui.onmessage = async (response: {
				// 	messages?: {role: string; content: string}[]
				// 	error?: Record<string, string>
				// 	state?: 'streaming' | 'complete'
				// }) => {
				// 	if (response.error) {
				// 		setLoadState('error')
				// 		setError(response.error)
				// 	} else if (response.messages) {
				// 		setMessages(response.messages)
				// 		if (response.state === 'complete') setLoadState('ready')
				// 	}
				// 	// @ts-ignore
				// 	resolve()
				// }
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
			stroke={{r: 0, g: 0, b: 0, a: 0.08}}
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
					/>
					<Line
						stroke="#000000"
						strokeWidth={1}
						opacity={0.08}
						length="fill-parent"
					/>
				</AutoLayout>
			)}
			{[
				...(keyVisible ? [keyMessage] : []),
				...(systemMessageVisible ? [systemMessage] : []),
				...messages
			].map((message, index) => (
				<AutoLayout direction="vertical" spacing={12} key={index}>
					<AutoLayout
						direction="horizontal"
						spacing={8}
						padding={{left: 0, vertical: 4}}
						verticalAlignItems="start"
					>
						<AutoLayout width={120}>
							<AutoLayout
								padding={{horizontal: 8, vertical: 4}}
								hoverStyle={{
									fill: {
										r: 0,
										g: 0,
										b: 0,
										a: 0.05
									}
								}}
								onClick={
									message.role === 'system' ||
									message.role === 'OpenAI Key'
										? undefined
										: () => {
												// Toggle role for msg at this index
												// Adjust index to account for system message and key message
												const adjustedIndex =
													index -
													(systemMessageVisible
														? 1
														: 0) -
													(keyVisible ? 1 : 0)
												const newMessages = [
													...messages
												]
												newMessages[
													adjustedIndex
												].role =
													newMessages[adjustedIndex]
														.role === 'user'
														? 'assistant'
														: 'user'
												setMessages(newMessages)
										  }
								}
								cornerRadius={4}
								width="hug-contents"
							>
								<Text
									fontFamily="Inter"
									fontSize={12}
									letterSpacing={1.2}
									textCase="upper"
									horizontalAlignText="left"
									verticalAlignText="center"
									height={20}
									fontWeight={600}
									width={
										{
											system: 57,
											user: 36,
											assistant: 78,
											'OpenAI Key': 83
										}[message.role]
									}
								>
									{message.role}
								</Text>
							</AutoLayout>
						</AutoLayout>
						<AutoLayout
							width={
								message.role === 'assistant' ||
								message.role === 'user'
									? 300
									: 334
							}
							padding={{top: 4}}
						>
							<Input
								width="fill-parent"
								value={message.content}
								fontWeight={400}
								lineHeight={23}
								onTextEditEnd={(e) => {
									// If msg is system or key, set appropriate state
									if (message.role === 'system') {
										setSystemMessage({
											...systemMessage,
											content: e.characters
										})
									}
									if (message.role === 'OpenAI Key') {
										setKeyMessage({
											...keyMessage,
											content: e.characters
										})
									}
									// Otherwise, update msg at this index
									// Adjust index to account for system message and key message
									const adjustedIndex =
										index -
										(systemMessageVisible ? 1 : 0) -
										(keyVisible ? 1 : 0)
									const newMessages = [...messages]
									newMessages[adjustedIndex].content =
										e.characters
									setMessages(newMessages)
								}}
								placeholder={
									{
										system: 'System Message',
										'OpenAI Key': 'OpenAI Key'
									}[message.role] ?? 'Message'
								}
								inputBehavior="multiline"
								paragraphSpacing={8}
							/>
						</AutoLayout>
						{message.role !== 'system' &&
							message.role !== 'OpenAI Key' && (
								<AutoLayout
									direction="horizontal"
									spacing={8}
									padding={{vertical: 4, horizontal: 4}}
									cornerRadius={4}
									hoverStyle={{
										fill: {
											r: 0,
											g: 0,
											b: 0,
											a: 0.05
										}
									}}
									onClick={() => {
										// Remove msg at this index
										// Adjust index to account for system message and key message
										const adjustedIndex =
											index -
											(systemMessageVisible ? 1 : 0) -
											(keyVisible ? 1 : 0)
										const newMessages = [...messages]
										newMessages.splice(adjustedIndex, 1)
										setMessages(newMessages)
									}}
								>
									<SVG
										src={`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>`}
										opacity={0.2}
									/>
								</AutoLayout>
							)}
					</AutoLayout>
					<Line
						stroke="#000000"
						strokeWidth={1}
						opacity={0.08}
						length="fill-parent"
					/>
				</AutoLayout>
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

widget.register(FableChat)
