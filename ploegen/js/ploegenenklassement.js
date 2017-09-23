// API information
const ORG = "BVBL1413";
const APIURL = "http://vblcb.wisseq.eu/VBLCB_WebService/";

const ORG_DETAILS = "data/OrgDetailByGuid?issguid=";
const ORG_MATCHES = "data/OrgMatchesByGuid?issguid=";
const RELATIES = "data/RelatiesByOrgGuid?orgguid=";
const TEAM_DETAIL = "data/TeamDetailByGuid?teamguid=";
const TEAM_MATCHES = "data/TeamMatchesByGuid?teamguid=";

// Container names
var teamcontainer = "team_container";
var rankingcontainer = "ranking_container";
var matchescontainer = "matches_container";

// Cache
var teams;

// Do something when the page is finished loading
$(document).ready(function () {
    getOrgDetails();
});

// Get Organisation Details
function getOrgDetails() {
    $.ajax({
        dataType : 'json',
        type : 'GET',
        url: APIURL + ORG_DETAILS + ORG,
        success: function(data) {
            teams = data[0].teams;
            generateTeamList(teams);
        }
    });
}

function generateTeamList(teams) {
    var teamContainer = document.getElementById(teamcontainer);
    teams.forEach(function(team) {
        var teamItem = document.createElement("ul");
        teamItem.id = team.guid;
        teamItem.setAttribute("onClick", "teamSelectEventListener(id)")
        
        var teamItemText = document.createTextNode(team.naam);
        
        teamItem.appendChild(teamItemText);
        teamContainer.appendChild(teamItem);
    }, this);
}

function teamSelectEventListener(teamguid) {
    console.log(teamguid);

    // spaces too + signs
    teamguid = teamguid.replace(/ /g,'+');
    console.log(teamguid);

    // Generate rankings
    getTeamDetails(teamguid);
}

// Get Organisation Matches
function getOrgMatches() {
    $.ajax({
        dataType : 'json',
        type : 'GET',
        url: APIURL + ORG_MATCHES + ORG,
        success: function(data) {

        }
    });
}

// Get Relations
function getRelations() {
    $.ajax({
        dataType : 'json',
        type : 'GET',
        url: APIURL + RELATIES + ORG,
        success: function(data) {

        }
    });
}

// Get Team Details
function getTeamDetails(teamguid) {
    $.ajax({
        dataType : 'json',
        type : 'GET',
        url: APIURL + TEAM_DETAIL + teamguid,
        success: function(data) {
            console.log(data);
            poules = data[0].poules;
            generateRankingList(poules);

        }
    });
}

function generateRankingList(poules) {
    var rankingContainer = document.getElementById(rankingcontainer);
    // empty ranking first
    while(rankingContainer.firstChild) {
        rankingContainer.removeChild(rankingContainer.firstChild);
    }

    poules.forEach(function(poule) {
        var pouleHeader = document.createElement("h3");
        pouleHeader.id = poule.guid;      
        var pouleHeaderText = document.createTextNode(poule.naam);
        
        pouleHeader.appendChild(pouleHeaderText);
        rankingContainer.appendChild(pouleHeader);

        // Ranking
        poule.teams.forEach(function(team) {
            var teamItem = document.createElement("ul");
            teamItem.id = team.guid;

            var teamItemText = document.createTextNode(team.naam);

            teamItem.appendChild(teamItemText);
            rankingContainer.appendChild(teamItem);
        }, this)
    }, this);
}



// Get Team Matches
function getTeamMatches(teamguid) {
    $.ajax({
        dataType : 'json',
        type : 'GET',
        url: APIURL + TEAM_MATCHES + teamguid,
        success: function(data) {

        }
    });
}