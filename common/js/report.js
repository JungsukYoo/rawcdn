/**
 * 
 */

var filter_list = ['usr','u_cid', 'h_dru', 'u_prod', 'd_dvce', 'u_dvce','flgshp_usr','flgshp_mau','pm_mad'];
var grafana_base = "";
var grafana_dashboard_base = "";

function setGrafanaBase(base) {
	grafana_base = base;
}

function setGrafanaDashboardBase(base) {
	grafana_dashboard_base = base;
}

//fldCode:RGN_CD|CNTY_CD,  fldValue: actual code 
// flgshp, pm ==> RGN_CD --> rgn_cd
function getFilterQuery(fldCode, fldValue) { 		
	
	var result = "";
	for(var idx=0; idx<filter_list.length; idx++){
		var filter = filter_list[idx];
		var newFldCode = fldCode;
		if (filter=='flgshp_usr' ||filter=='flgshp_mau'||filter=='pm_mad') {
			newFldCode =fldCode.toLowerCase();
		}		
		result += ('&var-' + filter_list[idx] + '='+ newFldCode + '%7C%3D%7C' + fldValue);					
	}
	return result;
}



function loadSingleFrame(sessionId, frmId, panelId,from,to) {					
	var unix_from = moment(from,'YYYY-MM-DD').unix()*1000;
	var unix_to = moment(to,'YYYY-MM-DD').unix()*1000;			
				
	console.log("loading frm:" + frmId);
	var target = grafana_base + "?orgId=2&from=" + unix_from + "&to=" + unix_to + "&theme=light";			
	var tick = new Date().getTime();
	var rgn_cd = $("#sel_rgn_cd option:selected").val();
	var cnty_cd = $("#sel_cnty_cd option:selected").val();
	var filter = "";
	
	if (cnty_cd !="All") { //컨 트리 조건이 있으면 AREA 필요 없음 			
		filter = getFilterQuery('cnty_cd', cnty_cd);
	}			
	else if (rgn_cd !="All") {				
			filter = getFilterQuery('rgn_cd', rgn_cd);
	}
	
	
	target = target + filter;			
	target = target + "&panelId=" + panelId + "&sessionid=" + sessionId;
	$("#frm" + frmId).attr("src", target);
}


function loadDashboard(sessionId, frmId, dashboardId,from,to) {					
	var unix_from = moment(from,'YYYY-MM-DD').unix()*1000;
	var unix_to = moment(to,'YYYY-MM-DD').unix()*1000;			
				
	console.log("loading dashboard:" + dashboardId);			
	var tick = new Date().getTime();
	var rgn_cd = $("#sel_rgn_cd option:selected").val();
	var cnty_cd = $("#sel_cnty_cd option:selected").val();
	var filter = "";
	if (cnty_cd==null) { 
		cnty_cd = "All";
	}
	
	if (rgn_cd==null) {
		rgn_cd = "All";
	}
	
	if (cnty_cd !="All") { //컨 트리 조건이 있으면 AREA 필요 없음 			
		filter = getFilterQuery('cnty_cd', cnty_cd);
	}			
	else if (rgn_cd !="All") {				
			filter = getFilterQuery('rgn_cd', rgn_cd);
	}
	
	var target = grafana_dashboard_base + "/" + dashboardId  ; // add dashboarid
	target = target + "?from=" + unix_from + "&to=" + unix_to + "&ordId=2&theme=light&kiosk"; // add range add mode			
	target = target + filter; //add filter			
	target = target + "&sessionid=" + sessionId;
	$("#frm" + frmId).attr("src", target);
}


