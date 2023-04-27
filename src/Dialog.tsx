import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import EditTextDialog from './EditTextDialog'
import reactStringReplace from 'react-string-replace'
import { sendMessage } from '../utils'

const MyModal: React.FC<{
  title: string
  template: string
  children: React.ReactNode
}> = ({ title, template, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [editableTemplate, setEditableTemplate] = useState<
    {
      originalText: string
      text: string
      editable: boolean
    }[]
  >([])

  const onChangeTemplate = (text: string, index: number) => {
    const newTemplate = [...editableTemplate]

    newTemplate[index] = {
      ...newTemplate[index],
      text,
    }

    setEditableTemplate(newTemplate)
  }

  React.useEffect(() => {
    const newTemplate = reactStringReplace(template, /\[(.*?)\]/g, (match) => ({
      originalText: match,
      text: match,
      editable: true,
    })).map((item) => {
      if (typeof item === 'string') {
        return {
          text: item,
          editable: false,
        }
      }

      return item
    })

    // @ts-expect-error TODO: Fix this
    setEditableTemplate(newTemplate)
  }, [])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const onAsk = () => {
    const newTemplate = editableTemplate.map((item) => {
      return item.text
    })

    const message = newTemplate.join('')
    sendMessage(message)
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="p-2 flex-1 text-center">
        {children}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full divide-y max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="px-4 py-2 text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="p-6">
                    <div className="text-sm text-gray-500">
                      {editableTemplate.map((item, index) => {
                        if (item.editable) {
                          return (
                            <EditTextDialog
                              key={index}
                              text={item.text}
                              originalText={item.originalText}
                              onTextChange={(text) =>
                                onChangeTemplate(text, index)
                              }
                            />
                          )
                        }

                        return item.text
                      })}
                    </div>
                  </div>

                  <div className="flex divide-x">
                    <button
                      type="button"
                      className="p-2 flex-1 text-center"
                      onClick={closeModal}>
                      取消
                    </button>
                    <button
                      type="button"
                      className="p-2 flex-1 text-center"
                      onClick={onAsk}>
                      問這題
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default MyModal
