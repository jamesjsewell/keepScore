import React from 'react'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'
//imported components
import Navbar from './components/navBar.js'
import JoinArenaComponent from './components/joinArenasPageComponents/joinArenaComponent.js'

const JoinArenasPage = React.createClass({

	componentWillMount: function(){

		ACTIONS.refresh_needed_data()

		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})

	},

	getInitialState: function() {

		return STORE.data

	},

	_renderArenas: function(arenas, filtered){
		
		if(filtered){

			console.log(arenas)
			if(arenas != undefined){

				var arenasArray = [] 

				for(var i = 0; i < arenas.length; i++){
					
					if(arenas[i] != undefined){

						arenasArray.push(<JoinArenaComponent arena={arenas[i]} />)
					}
					
				}

				return arenasArray
			}		

		}

		else{

			console.log(arenas)
			if(arenas != undefined){

				var arenasArray = [] 

				for(var i = 0; i < arenas.models.length; i++){
					
					if(arenas.models[i] != undefined){

						arenasArray.push(<JoinArenaComponent arena={arenas.models[i].attributes} />)
					}
					
				}

				return arenasArray
			}

		}
		
	},

	_renderAutoComplete: function(arenas){
	
		var arenasElements = []

		if(STORE.data.last_selected_input != undefined){

			if(STORE.data.last_selected_input.name === 'arenaSearch'){

				if(arenas != undefined){
					console.log(arenas)
					for(var i = 0; i < arenas.length; i++){
						console.log('yes')
						arenasElements.push(<ArenaSuggestionsComponent arena = {arenas[i].attributes}  />)

					}

					return arenasElements


				}

			}

		}

	},

	_handleClick: function(evt){

		evt.preventDefault()
		STORE._set({last_selected_input: evt.target})

	},

	_handleKeyPress: function(evt){

		var txt = evt.target.value

  		ACTIONS.query_arena_by_name(txt)

		evt.preventDefault()
	},

 	render: function(){

 		if(STORE.data.all_arenas != undefined){
 			var filtered = false
 			var arenas = STORE.data.all_arenas

 			if(STORE.data.arena_search_results != undefined){
 				arenas = STORE.data.arena_search_results
 				var filtered = true
 			}

 			console.log(arenas)

 			var suggestions = ""

			if(STORE.data.auto_complete_arenas != undefined){
				var suggestions = STORE.data.auto_complete_arenas.models
				console.log(suggestions)
			}
			
			return (

		 		<div className='blue-grey darken-4'>
		 			
		 			<Navbar />

	 				<div className="col s3 center-align container">

	 					<div className="input-field col s2 container">
	 						<h5 className="white-text title center-align">search arenas</h5>
	 						<input className="" onClick = {this._handleClick} onKeyUp = {this._handleKeyPress} name = "arenaSearch" placeholder = "name of arena" type="text" />
	 					</div>
	 					<label className="">{this._renderAutoComplete(suggestions)}</label>
	 				</div>

	 				<div className="container center-align">
		 				{this._renderArenas(arenas, filtered)}
		 			</div>

		 		</div>

			)

 		}

		else{

			return (

				<div className='blue-grey darken-4'>
					<Navbar />

		 			<div className='arena-create-wrapper'>
		 				
		 			

		 			</div>
				</div>

			)

		}

 		return(

 			<div></div>

 		)	
 		
 	}

})

const ArenaSuggestionsComponent = React.createClass({

	_handleClick: function(evt){

		evt.preventDefault()

		var id = this.props.arena._id

		if(STORE.data.arena_search_results != undefined){

			if(STORE.data.arena_search_results != undefined){
			
				if(STORE.data.arena_search_results.includes(this.props.arena)){

					console.log('player already in selected')

				}

				else{
					var arrayOfArenas = []
					if(STORE.data.arena_search_results != undefined){
						//var arrayOfArenas = STORE.data.arena_search_results
						//arrayOfArenas.push(this.props.arena)
						var arrayOfArenas = [this.props.arena]
					}
					else{
						var arrayOfArenas = [this.props.arena]
					}
			
					STORE._set({arena_search_results: arrayOfArenas})
					STORE._set({auto_complete_arenas: {}})

				}
			}
		}

		else{

			STORE._set({arena_search_results: [this.props.arena]})
			STORE._set({auto_complete_arenas: {}})

		}

	},

	render: function(){

		return(
			<label>
			<button className="chip waves-effect waves-light btn" type="button" onClick={this._handleClick}>{this.props.arena.name}</button>
			</label>
		)

	}

})

export default JoinArenasPage