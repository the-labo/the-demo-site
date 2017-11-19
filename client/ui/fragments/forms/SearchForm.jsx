/**
 * SearchForm component
 */
'use strict'

import React from 'react'
import c from 'classnames'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm } from '../../wrappers'

const SearchForm = asForm(
  function SearchFormImpl ({
                             l,
                             className,
                             name = 'q',
                             placeholder,
                             onSubmit,
                             getInputAttributesOf,
                             getLabelAttributesOf,
                             getFormAttributes,
                             getSubmitAttributes
                           }) {
    return (
      <TheForm className={c(className, 'search-form')}
               inline
               {...getFormAttributes()}
               required={[name]}
               autoComplete='off'
      >
        <TheInput.Text {...getInputAttributesOf(name)}
                       placeholder={placeholder}
                       autoFocus
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