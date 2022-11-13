import * as React from 'react'
import { navigate } from 'gatsby'

import { linkResolver } from '../utils/linkResolver'
import { FaGlobeAmericas } from 'react-icons/fa'
import * as s from './LanguageSwitcher.module.scss'

export const LanguageSwitcher = ({ activeDocMeta }) => {
  const currentLang = activeDocMeta.lang
  function fullLang(lang){
    return lang == "EN" ? "English" : lang == "FR" ? "French" : lang == "IU" ? "Inuktitut" : lang == "OJ" ? "Ojibwe" : lang  
  }
  const currentLangOption = (
    <option value={currentLang}>{fullLang(currentLang.slice(0, 2).toUpperCase())}</option>
  )

  const alternateLangOptions = activeDocMeta.alternateLanguages.map(
    (altLang, index) => (
      <option value={linkResolver(altLang)} key={`alt-lang-${index}`}>
        {fullLang(altLang.lang.slice(0, 2).toUpperCase())}
      </option>
    ),
  )

  const handleLangChange = (event) => {
    navigate(event.target.value)
  }

  return (
    <div className={s["banner"]}>
      <li className={s['language_switcher']}>
        <FaGlobeAmericas/>
        <div>
          <span>Language: </span>
          <select value={currentLang} onChange={handleLangChange}>
            {currentLangOption}
            {alternateLangOptions}
          </select>
        </div>
      </li>
    </div>
  )
}
