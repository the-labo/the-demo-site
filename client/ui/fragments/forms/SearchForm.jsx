/**
 * SearchForm component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm } from '../../wrappers'
import styles from './SearchForm.pcss'

const SearchForm = asForm(
  function SearchFormImpl ({
                             l,
                             className,
                             name = 'q',
                             placeholder,
                             onSubmit,
                             getInputAttributesOf,
                             getFormAttributes,
                             getSubmitAttributes
                           }) {
    return (
      <TheForm className={c(className, styles.self, 'search-form')}
               inline
               {...getFormAttributes()}
               required={[name]}
               autoComplete='off'
      >
        <TheInput.Text {...getInputAttributesOf(name)}
                       placeholder={placeholder}
                       onEnter={onSubmit}
        />
        <TheButton primary {...getSubmitAttributes()}>
          {l('buttons.DO_SEARCH')}
        </TheButton>
      </TheForm>
    )
  }
)

export default SearchForm
