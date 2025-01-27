import './popper-overlay.scss'

import { FC, ReactNode, useState } from 'react'
import OutsidePressHandler from 'react-native-outside-press';
import { Options, VariationPlacement } from '@popperjs/core'
import { usePopper } from '@chakra-ui/popper'
import classNames from 'classnames'
import { Text, TouchableOpacity, View } from 'react-native'

type PopperRenderProps = {
  closePopperOverlay: () => void
}

export type PopperOverlayProps = {
  buttonClassName?: string
  buttonText: ReactNode
  children: (_props: PopperRenderProps) => ReactNode
  options?: Options
  popperClassName?: string
}

export const PopperOverlay: FC<PopperOverlayProps> = (props) => {
  const { buttonText, buttonClassName, children, options = { placement: 'bottom-end' as VariationPlacement }, popperClassName } = props

  const [isOpen, setIsOpen] = useState(false)

  const { popperRef, referenceRef } = usePopper(options)

  const closePopperOverlay = () => setIsOpen(false)

  const handleOutsidePress = () => {
    // const targetId = event.target.getAttribute('id')
    // if (!targetId || !targetId.includes('react-select')) {
    //   setIsOpen(false)
    // }
    closePopperOverlay();
  }

  const togglePopperOverlay = () => setIsOpen(!isOpen)

  return (
    <OutsidePressHandler onOutsidePress={() => {
        handleOutsidePress();
    }} >
      <TouchableOpacity ref={referenceRef} className={classNames('popper-overlay-button', buttonClassName)} onClick={togglePopperOverlay}>
        <Text>{buttonText}</Text>
      </TouchableOpacity>

      <View
        ref={popperRef}
        className={classNames('popper-drop-down', popperClassName, {
          'popper-tool-tip-hidden': !isOpen
        })}
      >
        {children({ closePopperOverlay })}
      </View>
    </OutsidePressHandler>
  )
}