import React from 'react'
import InfoBox from './InfoBox'

const InfoBoxes = () => {
    return (
        <section>
            <div className='container-xl lg:container m-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
                    <InfoBox
                        heading="For Renters"
                        backgroundColor="bg-[#F5E0DF]"
                        buttonInfo={{
                            text: 'Browse Properties',
                            link: '/properties',
                            backgroundColor: 'bg-[#2A1234]'
                        }}
                    >
                        Find your dream rental property. Bookmark properties and contact owners
                    </InfoBox>
                    <InfoBox
                        heading="For Property Owners"
                        backgroundColor='bg-[#D0D1D3]'
                        buttonInfo={{
                            text: 'Add Property',
                            link: '/properties/add',
                            backgroundColor: 'bg-[#2A1234]'
                        }}>
                        List your properties and reach potential tenants.
                    </InfoBox>
                </div>
            </div>

        </section>
    )
}

export default InfoBoxes