// // This is a counter widget with buttons to increment and decrement the number.

// const { widget } = figma
// const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG } = widget

// function Widget() {
//   const [count, setCount] = useSyncedState('count', 0)

//   if (count !== 0) {
//     usePropertyMenu(
//       [
//         {
//           itemType: 'action',
//           propertyName: 'reset',
//           tooltip: 'Reset',
//           icon: `<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9026 1.43168C12.1936 1.47564 12.4822 1.54098 12.7663 1.62777L12.7719 1.62949C14.0176 2.0114 15.109 2.78567 15.8858 3.83854L15.8918 3.84665C16.5473 4.73808 16.9484 5.78867 17.058 6.88508L14.0863 4.88858L13.3259 6.02047L17.3852 8.74774L17.9079 9.09894L18.2994 8.60571L21.0056 5.19662L19.9376 4.34879L18.3531 6.34479C18.3424 6.27511 18.3306 6.20563 18.3179 6.13636C18.1135 5.02233 17.6601 3.96334 16.9851 3.04274L16.9791 3.03462C16.0303 1.74427 14.6956 0.794984 13.1714 0.326388L13.1658 0.32466C12.8171 0.217755 12.4627 0.137298 12.1055 0.0832198C10.899 -0.0994351 9.66061 0.0188515 8.50099 0.435448L8.4947 0.437711C7.42511 0.823053 6.46311 1.44778 5.6774 2.25801C5.38576 2.55876 5.11841 2.88506 4.87886 3.23416C4.85856 3.26376 4.83845 3.29351 4.81854 3.32343L5.94262 4.08294L5.94802 4.07484C5.96253 4.0531 5.97717 4.03146 5.99195 4.00993C6.71697 2.95331 7.75331 2.15199 8.95541 1.72013L8.9617 1.71788C9.33245 1.58514 9.71301 1.48966 10.098 1.43156C10.6957 1.34135 11.3039 1.34123 11.9026 1.43168ZM3.70034 6.39429L0.994141 9.80338L2.06217 10.6512L3.64663 8.65521C3.65741 8.72489 3.66916 8.79437 3.68187 8.86364C3.88627 9.97767 4.33964 11.0367 5.01467 11.9573L5.02063 11.9654C5.96945 13.2557 7.30418 14.205 8.82835 14.6736L8.83398 14.6753C9.18281 14.7823 9.53732 14.8628 9.89464 14.9168C11.101 15.0994 12.3393 14.9811 13.4988 14.5646L13.5051 14.5623C14.5747 14.1769 15.5367 13.5522 16.3224 12.742C16.614 12.4413 16.8813 12.115 17.1209 11.7659C17.1412 11.7363 17.1613 11.7065 17.1812 11.6766L16.0571 10.9171L16.0518 10.9252C16.0372 10.9469 16.0225 10.9686 16.0078 10.9902C15.2827 12.0467 14.2464 12.848 13.0444 13.2799L13.0381 13.2821C12.6673 13.4149 12.2868 13.5103 11.9018 13.5684C11.3041 13.6587 10.6958 13.6588 10.0971 13.5683C9.8062 13.5244 9.51754 13.459 9.23347 13.3722L9.22784 13.3705C7.98212 12.9886 6.89078 12.2143 6.11393 11.1615L6.10795 11.1534C5.45247 10.2619 5.05138 9.21133 4.94181 8.11492L7.91342 10.1114L8.6739 8.97953L4.61459 6.25226L4.09188 5.90106L3.70034 6.39429Z" fill="white"/>
//           </svg>
//           `,
//         },
//       ],
//       () => {
//         setCount(0)
//       },
//     )
//   }

//   return (
//     <AutoLayout
//       verticalAlignItems={'center'}
//       spacing={8}
//       padding={16}
//       cornerRadius={8}
//       fill={'#FFFFFF'}
//       stroke={'#E6E6E6'}
//     >
//       <SVG
//         src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect width="30" height="30" rx="15" fill="white"/>
//         <rect x="7.5" y="14.0625" width="15" height="1.875" fill="black" fill-opacity="0.8"/>
//         <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
//         </svg>`}
//         onClick={() => {
//           setCount(count - 1)
//         }}
//       ></SVG>
//       <Text fontSize={32} width={42} horizontalAlignText={'center'}>
//         {count}
//       </Text>
//       <SVG
//         src={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect width="30" height="30" rx="15" fill="white"/>
//         <path d="M15.9375 7.5H14.0625V14.0625H7.5V15.9375H14.0625V22.5H15.9375V15.9375H22.5V14.0625H15.9375V7.5Z" fill="black" fill-opacity="0.8"/>
//         <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="black" stroke-opacity="0.1"/>
//         </svg>`}
//         onClick={() => {
//           setCount(count + 1)
//         }}
//       ></SVG>
//     </AutoLayout>
//   )
// }

// widget.register(Widget)

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

	const [costVisible, setCostVisible] = useSyncedState<boolean>(
		'costVisible',
		false
	)

	const [keyVisible, setKeyVisible] = useSyncedState<boolean>(
		'keyVisible',
		false
	)
	const [keyMessage, setKeyMessage] = useSyncedState<{
		role: 'OpenAI Key'
		content: string
	}>('key', {role: 'OpenAI Key', content: ''})

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
						label: 'GPT-3.5 Turbo'
					}
				],
				selectedOption: 'gpt-4'
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
				selectedOption: '0.7'
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
				selectedOption: '1'
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
				propertyName: 'toggleCost',
				itemType: 'toggle',
				tooltip: 'Toggle Tokens & Cost',
				isToggled: costVisible,
				icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
			},

			{
				propertyName: 'resetChat',
				itemType: 'action',
				tooltip: 'Reset Chat',
				icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v6h6"></path><path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path></svg>`
			}
		],
		async (event) => {
			switch (event.propertyName) {
				case 'toggleTitle':
					setTitleVisible((v) => !v)
					break
				case 'toggleSystem':
					setSystemMessageVisible((v) => !v)
					break
				case 'toggleCost':
					setCostVisible((v) => !v)
					break
				case 'toggleKey':
					setKeyVisible((v) => !v)
					break
				case 'reset':
					setMessages(SampleMessages)
					break
			}
		}
	)

	const addMessage = () => {
		setMessages([
			...messages,
			{
				role:
					messages[messages.length - 1].role === 'user'
						? 'assistant'
						: 'user',
				content: ''
			}
		])
	}

	const submit = async () => {
		waitForTask(
			new Promise((resolve) => {
				figma.showUI(__html__, {visible: false})
				figma.ui.postMessage({
					type: 'submit',
					messages,
					systemMessage,
					key: keyMessage.content
				})

				figma.ui.onmessage = async (
					response: {role: string; content: string}[]
				) => {
					// 	newMessages.forEach(msg => {
					// 		messages.set()
					//   messages.set(msg);
					console.log(response)
					resolve(true)
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
						keyMessage.content
							? '#A953FE'
							: {r: 0, g: 0, b: 0, a: 0.2}
					}
					onClick={keyMessage.content ? submit : undefined}
					verticalAlignItems="center"
					horizontalAlignItems="center"
					padding={{vertical: 6, horizontal: 8}}
					spacing={6}
					hoverStyle={keyMessage.content ? {fill: '#832DDA'} : {}}
					tooltip={
						keyMessage.content ? '' : 'Enter your OpenAI Key first'
					}
				>
					<SVG
						src={`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`}
					/>
					<Text
						fontFamily="Inter"
						fontSize={14}
						horizontalAlignText="center"
						verticalAlignText="center"
						fill="#fff"
						fontWeight={600}
					>
						Submit
					</Text>
				</AutoLayout>
			</AutoLayout>
		</AutoLayout>
	)
}

widget.register(FableChat)
