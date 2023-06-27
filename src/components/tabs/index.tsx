import { Tab } from '@headlessui/react';
import { useState } from 'react';

import AllJobsTable from '@/components/tables/AllJobsTable';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
  const [categories] = useState({
    Ongoing: {},
    Completed: {},
  });

  return (
    <div className='w-full  px-2  sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex max-w-md space-x-2 rounded-xl bg-[#464646] p-2'>
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white',
                  'focus:outline-none focus:ring-0',
                  selected
                    ? 'bg-[#2E2E2E] shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-4'>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames('w-full rounded-xl bg-[#282828] px-6 py-6')}
            >
              <AllJobsTable />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
