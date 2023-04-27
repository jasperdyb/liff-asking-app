import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const EditTextDialog: React.FC<{
  originalText: string
  text: string
  onTextChange?: (text: string) => void
}> = ({ text, onTextChange, originalText }) => {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function onConfirm() {
    closeModal()
  }

  function onCancel() {
    onTextChange && onTextChange(originalText)
    closeModal()
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex-1 text-center text-red-500">
        {text}
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
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto px-2">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="max-w-md transform divide-y overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="px-6 py-3">
                    <input
                      value={text}
                      onChange={(e) =>
                        onTextChange && onTextChange(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          onConfirm()
                        }
                      }}
                    />
                  </div>
                  <div className="flex divide-x">
                    <button
                      type="button"
                      className="p-2 flex-1 text-center"
                      onClick={() => {
                        onCancel()
                      }}>
                      取消
                    </button>
                    <button
                      type="button"
                      className="p-2 flex-1 text-center"
                      onClick={onConfirm}>
                      確認
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
export default EditTextDialog
