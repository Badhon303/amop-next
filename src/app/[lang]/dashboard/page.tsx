import { getDictionary } from "../../../../get-dictionary"
import { Locale } from "../../../../i18n-config"

export default async function DemoTest({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <>
      <h1 className="mb-10">Dashboard</h1>
      <p>{dictionary.tableHeader.provider}</p>
      <p>{dictionary.tableHeader.customer}</p>
      <p>{dictionary.tableHeader.license}</p>
      <p>{dictionary.tableHeader.manufacturer}</p>
      <p>{dictionary.tableHeader.status}</p>
      <p>{dictionary.tableHeader.lastConnect}</p>
      <p>{dictionary.tableHeader.actions}</p>
    </>
  )
}
