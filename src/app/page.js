import Hero from '@/components/layout/Hero'
import HomeMenu from '@/components/layout/HomeMenu'
import SectionHeaders from '@/components/layout/SectionHeaders'

export default function Home() {
  return (
    <>
      
      <Hero />
      <HomeMenu />
      <section className='text-center my-16'>
          <SectionHeaders 
              subHeader={'Our story'}
              mainHeader={'Above us'}
          />
          <div className='text-gray-500 max-w-md mx-auto mt-4 flex-col gap-4'>
            <p>
            Lorem skskaa akaaka akakaa akakaa akakaa
            ajajsdkd sjkajd aaja Lorem skskaa akaaka 
            akakaa akakaa akakaa Lorem skskaa akaaka 
            akakaa akakaa akakaa ajajsdkd sjkajd aaja
            ajajsdkd sjkajd aaja Lorem skskaa akaaka 
            akakaa akakaa akawe ajajsdkd sjkajd aaja
            </p>
            <p>
            Lorem skskaa akaaka akakaa akakaa akakaa
            ajajsdkd sjkajd aaja Lorem skskaa akaaka 
            akakaa akakaa akakaa Lorem skskaa akaaka 
            akakaa akakaa akakaa ajajsdkd sjkajd aaja
            ajajsdkd sjkajd aaja Lorem skskaa akaaka 
            akakaa akakaa akawe ajajsdkd sjkajd aaja
            </p>
            <p>
            Lorem skskaa akaaka akakaa akakaa akakaa
            ajajsdkd sjkajd aaja Lorem skskaa akaaka 
            akakaa akakaa akakaa Lorem skskaa akaaka 
            </p>
          </div>
      </section>
      <section className='text-center my-8'>
            <SectionHeaders 
              subHeader={'Don\'t hesitate'}
              mainHeader={'Contact us'}
            />
            <div className='mt-8'>
              <a className='text-4xl underline text-gray-500' href='tel:+254707606757'>
                +254 707 606 757
              </a>
            </div>
      </section>
      
    </>
  )
}
