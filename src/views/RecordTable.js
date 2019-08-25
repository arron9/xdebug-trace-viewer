const Backbone = require('backbone');
const RecordTableInfo = require('../models/RecordTableInfo');
const RecordDetail = require('./RecordDetail');

class RecordTable extends Backbone.View {
	initialize() {
		this.el = '#grid';

		this.model = RecordTableInfo;

		this.grid = $('#grid').w2grid({
			name: 'grid',
			show: {
				toolbar: true,
				footer: true
			},
			columns: [
				{field: 'level', caption: 'Level', size: '150px'},
				{field: 'funcNumber', caption: 'Function Number', size: '100px'},
				{field: 'time', caption: 'Time', size: '100px'},
				{field: 'timeUsage', caption: 'Time Usage', size: '100px'},
				{field: 'mem', caption: 'Mem', size: '100px'},
				{field: 'memDelta', caption: 'Mem Delta', size: '100px'},
				{field: 'function', caption: 'Function', size: '30%'},
				{field: 'isUserDefined', caption: 'User Defined', size: '100px'},
				{field: 'file', caption: 'File', size: '30%'},
				{field: 'includeFile', caption: 'Include File', size: '100px'}
			],
			records: [],
			toolbar: {
				items: [
					{
						type: 'check',
						id: 'showDetail',
						caption: w2utils.lang('Details'),
						hint: w2utils.lang('Show function call details'),
						onClick: () => this.onDetailClick()
					}
				],
				tooltip: 'bottom'
			},
			onSelect: (event) => this.onSelect(event)
		})
		this.grid.refresh();

		this.detailView = new RecordDetail({model: this.model});
	}

	onSelect(event) {
		let record = w2ui.grid.get(event.recid);
		this.model.setSelectedRecord(record);
	}

	onDetailClick() {
		this.model.setShowDetail(!this.model.showDetail());
			//
			// this.showDetail = !this.showDetail;
			// if (showDetail) {
			// 	let selected = this.grid.getSelection()
			// 	if (selected && selected.length > 0) {
			// 		let record = this.grid.get(selected[0]);
			// 		updateDetail(record);
			// 	}
			// } else {
			// 	closeDetailPanel();
			// }
	}


}

module.exports = RecordTable;
