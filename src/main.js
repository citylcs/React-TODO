import React from 'react';
import ReactDOM from 'react-dom';

// 输出并根据情况过滤<li>标签里的内容
class List extends React.Component {
    render() {
        return (
            <ul id="todo">
                {
                    this.props.items.map((item, i) => {
                        if (item.name.indexOf(this.props.filterText) === -1) {
                            return;
                        }
                        return (
                            <li data-id={item.id} key={i}>
                                {item.name}
                                <button id="button"
                                        onClick={() => this.props.remove(item.id)}>×</button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

//过滤输入框
class FilterInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.props.onInputChange(e.target.value);
    }

    render() {
        return (
            <input type="text"
                   id="filter"
                   onChange={this.handleInputChange}
                   value={this.props.filterText}
                   placeholder="Filter"/>
        )
    }
}

//总体组件
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.addItem = this.addItem.bind(this);
        this.filterChange = this.filterChange.bind(this);
        this.state = {items: [
            {id:1,name:"Running"},
            {id:2,name:"Go Home"},
            {id:3,name:"Buy Apple"},
        ],
            filterText: '',
        }
    }

    addItem(e) {
        let itemArray = this.state.items;
        if (this._inputElement.value !== '') {//获取input框的值，并阻止空字符串的输出
            itemArray.push(
                {
                    name: this._inputElement.value,
                    id: Date.now(), //使用当前的时间赋值给当前item id，保证唯一性
                });
            this.setState({items: itemArray});
            this._inputElement.value = '';
            this._inputElement.setAttribute('placeHolder', '');
            e.preventDefault(); //阻止浏览器submit事件默认POST行为
        }
        else {
            this._inputElement.setAttribute('placeHolder', 'You must be write something!');
            e.preventDefault();
        }
    }

    remove(id){
        this.setState({
            items: this.state.items.filter((el) => id !== el.id)
        })
    }

    filterChange(filterText) {
        this.setState({filterText: filterText})
    }

    render(){
        return(
            <div id="container">
                <h1>React TODO</h1>
                <form onSubmit={this.addItem}>
                    <label>Todo:
                        <input id="inputId"
                               ref={(a) => this._inputElement = a}/>
                    </label>
                    <button id="add" type="submit">add</button>
                    <FilterInput filterText={this.state.filterText}
                                 onInputChange={this.filterChange}/>
                </form>
                <List items={this.state.items}
                      remove={this.remove}
                      filterText={this.state.filterText} />
            </div>
        )
    }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById('main')
);