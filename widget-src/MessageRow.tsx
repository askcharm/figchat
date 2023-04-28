const {widget} = figma
const {AutoLayout, Text, Input, Line, SVG} = widget

import {ChatMessage} from './code'

type MessageRowProps = {
	message: ChatMessage
	index?: number
	expandable?: boolean
	deleteable?: boolean
	placeholder?: string
	widened?: boolean
	roleWidth?: number
	roleColor?: string
	monospace?: boolean

	onDelete?: () => void
	onExpandCollapse?: (expanded: boolean) => void
	onToggleRole?: (role: 'user' | 'assistant') => void
	onUpdateContent?: (content: string) => void
}

export const MessageRow = ({
	message,
	index,
	expandable,
	deleteable,
	placeholder,
	widened,
	roleWidth,
	roleColor = '#000000',
	monospace = false,

	onDelete,
	onExpandCollapse,
	onToggleRole,
	onUpdateContent
}: MessageRowProps) => {
	return (
		<AutoLayout direction="vertical" spacing={12} key={index}>
			<AutoLayout
				direction="horizontal"
				spacing={8}
				padding={{left: 0, vertical: 4}}
				verticalAlignItems="start"
			>
				<AutoLayout width={160}>
					{expandable && (
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
							onClick={() =>
								onExpandCollapse?.(!message.collapsed)
							}
						>
							<SVG
								src={
									!message.collapsed
										? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>`
										: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`
								}
								opacity={0.2}
							/>
						</AutoLayout>
					)}
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
							['assistant', 'user'].includes(message.role)
								? () =>
										onToggleRole?.(
											message.role === 'assistant'
												? 'user'
												: 'assistant'
										)
								: undefined
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
							width={roleWidth}
							fill={roleColor}
						>
							{message.role}
						</Text>
					</AutoLayout>
				</AutoLayout>
				<AutoLayout
					width={
						deleteable
							? 300 + (widened ? 320 : 0)
							: 334 + (widened ? 320 : 0)
					}
					padding={{top: 4}}
				>
					{message.collapsed && (
						<Text
							width="fill-parent"
							fontWeight={400}
							lineHeight={23}
							height={23}
							paragraphSpacing={8}
							onClick={() => onExpandCollapse?.(true)}
							fill={{r: 0, g: 0, b: 0, a: 0.5}}
							fontFamily={monospace ? 'Roboto Mono' : 'Inter'}
						>
							{message.content
								.split('')
								.slice(0, widened ? 70 : 30)
								.join('') + '...'}
						</Text>
					)}
					{!message.collapsed && (
						<Input
							width="fill-parent"
							value={message.content}
							fontWeight={400}
							lineHeight={23}
							onTextEditEnd={(e) => {
								onUpdateContent?.(e.characters)
							}}
							placeholder={placeholder}
							height={!message.collapsed ? 'hug-contents' : 23}
							paragraphSpacing={8}
							fontFamily={monospace ? 'Roboto Mono' : 'Inter'}
						/>
					)}
				</AutoLayout>
				{deleteable && (
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
						onClick={onDelete}
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
	)
}
