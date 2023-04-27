import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import EditDialog from './Dialog'
import reactStringReplace from 'react-string-replace'
import liff from '@line/liff'
import { sendMessage } from '../utils'

const example = {
  title: '測試問題',
  template: '這是關於[主題]的報告內容,請提供[數字]種開頭方式',
}

const tabs = [
  {
    name: '範例問題集',
    content: (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="divide-y">
          <div className="p-3">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {example.title}
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>{example.template}</p>
            </div>
          </div>
          <div className="flex divide-x">
            <button
              type="button"
              className="p-2 flex-1 text-center"
              onClick={() => {
                const newTemplate = reactStringReplace(
                  example.template,
                  /\[(.*?)\]/g,
                  (match, i) => match
                )
                const message = newTemplate.join('')
                sendMessage(message)
              }}>
              直接問
            </button>
            <EditDialog title={example.title} template={example.template}>
              編輯
            </EditDialog>
          </div>
        </div>
      </div>
    ),
  },
  // { name: 'Tab 2', content: 'Content 2' },
]

function MyTabs() {
  return (
    <Tab.Group>
      <Tab.List className={'border-b border-gray-400'}>
        {tabs.map((tab) => (
          <Tab as={Fragment} key={tab.name}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={[
                  'px-4 py-2',
                  selected ? 'bg-blue-500 text-white' : 'bg-white text-black',
                ].join(' ')}>
                {tab.name}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.name} className={'p-4'}>
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default MyTabs
