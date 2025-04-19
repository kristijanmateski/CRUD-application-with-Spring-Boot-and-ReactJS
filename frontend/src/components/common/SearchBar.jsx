import React from 'react'

export default function SearchBar({search, setSearch}) {
  return (
    <div className='col-sm-6 mb-4'>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="search" role='searchbox' placeholder='Search student...' value={search}  onChange={(e)=>setSearch(e.target.value)} className='form-control'/>
        </form>
    </div>
  )
}
