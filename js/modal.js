var crntType = 'cancel'
let sucess = true //10.3 confirm 
function openTargetDialog(type, info){
    closeAllDialog()
    openDialog('#class-complete', '#dialogTemplate')
    crntType = type
    switch(type) {
        case "cancel":{
            let title = "예약취소"
            let desc = "정말 예약을 취소하시겠습니까?"
            fillDialog({type, title, desc, crntCount:null})
            break;
        }
        case "absent":{
            let title = "결석처리"
            let desc = `결석처리시 ${info.userName} 회원님 1:1PT 남은 횟수가 1회 차감 됩니다.`
            let crntCount = info.crntCount
            fillDialog({type, title, desc, crntCount})
            break;
        }
        case "attendance":{
            let title = "출석처리"
            let desc = `출석처리시 ${info.userName} 회원님 1:1PT 남은 횟수가 1회 차감 됩니다.`
            let crntCount = info.crntCount
            fillDialog({type, title, desc, crntCount})
            break;
        }

        case "delete": {
            let title = "스케줄삭제"
            let desc = `스케줄삭제시 ${info.userName} 회원님 1:1PT 남은 횟수가 1회 복구 됩니다.`
            let crntCount = info.crntCount
            fillDialog({type, title, desc, crntCount})
            break;
        }

        case "confirm": {
            let desc = `출석처리시 ${info.userName} 회원님 1:1PT 남은 횟수가 1회 차감 됩니다.`
            break;
        }
        case "errorNumMember": {
            // let title = "스케줄삭제"
            // let desc = `참여한 총 인원의 숫자를 입력햐셔야 합니다.`
            // let crntCount = info.crntCount
            let numMember = Number(document.querySelector('#numMember').value) | null
            // alert(numMember)
            if(numMember){
                let desc = `총 ${numMember}인 참여로 수업을 완료 하시겠습니까?`
                let title ='수업완료'
                // let crntCount = info.crntCount
                fillDialog({type, desc, title})
                sucess = true
            }
            else{
                sucess = false
                openDialog('#class-complete','#dialogConfirmTemplate')
            }
                
        }
        case "":{

        }
        
        default:
    }
}

function closeAllDialog(){
    var dialogs = document.querySelectorAll('.dialog')
    dialogs.forEach(dialog => {
        dialog.classList.add('none')
        dialog.classList.remove('display')
    })
    
}


function fillDialog(content){
    let dialogTemplate = document.querySelector('#dialogTemplate')
    if(content.type == 'cancel'){
        dialogTemplate.querySelector('.title').textContent = content.title
        dialogTemplate.querySelector('.longDesc').textContent = content.desc
        dialogTemplate.querySelector('.dialog-detail2').classList.add('none')
    } else if(content.type == 'absent'){
        dialogTemplate.querySelector('.title').textContent = content.title
        dialogTemplate.querySelector('.longDesc').textContent = content.desc
        dialogTemplate.querySelector('.dialog-detail2').classList.add('display')
        dialogTemplate.querySelector('.beforeCounter').textContent = content.crntCount
        dialogTemplate.querySelector('.afterCounter').textContent = content.crntCount - 1
    }
    else if(content.type == 'attendance'){
        dialogTemplate.querySelector('.title').textContent = content.title
        dialogTemplate.querySelector('.longDesc').textContent = content.desc
        dialogTemplate.querySelector('.dialog-detail2').classList.add('display')
        dialogTemplate.querySelector('.beforeCounter').textContent = content.crntCount
        dialogTemplate.querySelector('.afterCounter').textContent = content.crntCount - 1
    }
    else if(content.type =='delete') {
        dialogTemplate.querySelector('.title').textContent = content.title
        dialogTemplate.querySelector('.longDesc').textContent = content.desc
        dialogTemplate.querySelector('.dialog-detail2').classList.add('display')
        dialogTemplate.querySelector('.beforeCounter').textContent = content.crntCount
        dialogTemplate.querySelector('.afterCounter').textContent = content.crntCount + 1
    }
    else if(content.type =='errorNumMember') {
        dialogTemplate.querySelector('.title').textContent = content.title
        dialogTemplate.querySelector('.title').classList.remove('display')
        // dialogTemplate.querySelector('.title').classList.add('none')
        dialogTemplate.querySelector('.longDesc').textContent = content.desc
        dialogTemplate.querySelector('.dialog-detail2').classList.add('none')

        // dialogTemplate.querySelector('.beforeCounter').textContent = content.crntCount
        // dialogTemplate.querySelector('.afterCounter').textContent = content.crntCount + 1
    }
   
}

function openDialog(parentId, childId, callBack){

    var cc = document.querySelector(parentId)
    var dialog1 = document.querySelector(childId)
    dialog1.classList.add('modal')
    dialog1.classList.add("display");
    dialog1.classList.remove("none");
    let confirmMessage = "예약이 취소 되었습니다."
    if(crntType =='cancel') {
        confirmMessage = "예약이 취소 되었습니다."
    }
    else if(crntType =='absent') {
        confirmMessage = "결석처리 되었습니다."
    }
    else if(crntType =='attendance') {
        confirmMessage = "출석처리 되었습니다."
    }
    else if(crntType =='delete') {
        confirmMessage = "스케줄이 삭제 되었습니다."
    }
    else if(crntType =='errorNumMember') {
        if(!sucess)
            confirmMessage = "참여한 총 인원의 숫자를 입력하셔야 합니다."
        else
            confirmMessage = "수업이 완료되었습니다."
    }
    else if (crntType == "resv") {
        confirmMessage = "예약완료 되었습니다."
    }
    else if (crntType =='schedule') {
        confirmMessage = "스캐줄을 추가하였습니다."
    }
    let confirmTag = dialog1.querySelector('.confirm-message')
    if(confirmTag)
        confirmTag.textContent = confirmMessage
    cc.append(dialog1)
    if(callBack)
        callBack()
}

function closeDialog(id, status){
    var dialog1 = document.querySelector(id)
    dialog1.classList.add("none");
    dialog1.classList.remove("display");
    console.log(status)
}

function loadClasses(classes, type){
    
    let list = document.querySelector(`#${type}`)
    let tags = ''
    list.innerHTML = tags
    classes.forEach(classObj=>{
        let tag = ''
        if(type == 'availTicket')
            tag = `<li class="class-detail">
                <div class="class-title">${classObj.title} </div>
                <div>
                    <span class="class-prop-title">유효기간</span>
                    <span class="class-prop-value">${classObj.dateRange}</span>
                </div>
                <div>
                    <span class="class-prop-title">잔여횟수</span>
                    <span class="class-prop-value">${classObj.totalCount}회 중 ${classObj.count}회</span>
                </div>
                <div>
                    <span class="class-prop-title">레슨예약</span>
                    <span class="class-prop-value">${classObj.resvCount}회</span>
                </div>
                <button class="class-resv-btn" onClick="loadClassResv({})"> 예약하기 </button>
            </li>`
        else if(type == 'expiredTicket')
            tag = `<li class="class-detail">
                <div class="class-title">${classObj.title} </div>
                <div>
                    <span class="class-prop-title">유효기간</span>
                    <span class="class-prop-value">${classObj.dateRange}</span>
                </div>
                <div>
                    <span class="class-prop-title">잔여횟수</span>
                    <span class="class-prop-value">${classObj.totalCount}회 중 ${classObj.count}회</span>
                </div>
                <div>
                    <span class="class-prop-title">레슨예약</span>
                    <span class="class-prop-value">${classObj.resvCount}회</span>
                </div>
            </li>`
        tags += tag
    })
    list.innerHTML = tags  
    
}

function loadClassResv(){

}
function openTab(id){
    var allContainer = document.querySelectorAll(".tab-list")
    allContainer.forEach(container => {
        container.classList.remove('display')
        container.classList.add('none')
    })
    var detail = document.querySelector(`#${id}`)
    detail.classList.add('display')
}

function hideAllContainers(){
    var allContainer = document.querySelectorAll(".user-list-conatiner")
    allContainer.forEach(container => {
        container.classList.remove('display')
        container.classList.add('none')
    })
}

function userDetail(userId){
    // hideAllContainers()
    // var detail = document.querySelector("#detail")
    // detail.classList.add('display')
}

function reservationDetail(userId, classId){
    hideAllContainers()
    var detail = document.querySelector("#reservation")
    detail.classList.add('display')
}
function reservationConfirm(classInfo){
    hideAllContainers()
    var detail = document.querySelector("#reservationConfirm")
    detail.classList.add('display')
}

function showContainer(id){
    hideAllContainers()
    var detail = document.querySelector(`#${id}`)
    detail.classList.add('display')
}

function resvClass(hour){
    // showContainer("reservationConfirm")
    console.log(hour, ' is selected')
}

function completeResv(){
    console.log(1)
    type = 'resv'
    openDialog('#reservationConfirm','#dialogConfirmTemplate')

}

var classes = [
    {title: '1:1 개인레슨 1', dateRange: '2019.03.01~2019.12.12', totalCount: 50,count: 13, resvCount: 2,},
    {title: '리포머 수업 1', dateRange: '2019.03.01~2019.12.12', totalCount: 50, count: 13, resvCount: 2,},
    {title: '1:1 개인레슨 1', dateRange: '2019.03.01~2019.12.12', totalCount: 50, count: 13, resvCount: 2,},
]
loadClasses(classes, 'availTicket')

var classes2 = [
    {title: '1:1 개인레슨 2', dateRange: '2019.03.01~2019.12.12', totalCount: 50,count: 13, resvCount: 2,},
    {title: '리포머 수업 2', dateRange: '2019.03.01~2019.12.12', totalCount: 50, count: 13, resvCount: 2,},
    {title: '1:1 개인레슨 2', dateRange: '2019.03.01~2019.12.12', totalCount: 50, count: 13, resvCount: 2,},
    {title: '1:1 개인레슨 2', dateRange: '2019.03.01~2019.12.12', totalCount: 50,count: 13, resvCount: 2,},
    {title: '리포머 수업 2', dateRange: '2019.03.01~2019.12.12', totalCount: 50, count: 13, resvCount: 2,},
    {title: '1:1 개인레슨 2', dateRange: '2019.03.01~2019.12.12', totalCount: 50, count: 13, resvCount: 2,},
]
loadClasses(classes2, 'expiredTicket')

var openCalendar = false
function toggleCalendar(){
    openCalendar  = !openCalendar
    console.log(openCalendar)
    if(openCalendar) showCalendar()
    else hideCalendar()
}
function hideCalendar(){
    let calContainer = document.querySelector('.calendar-container')
    calContainer.classList.add('none')
    calContainer.classList.remove('display')
    // calContainer.classList.add('none')
}
function showCalendar(){
    let calContainer = document.querySelector('.calendar-container')
    calContainer.classList.add('display')
    calContainer.classList.remove('none')
}
// showContainer('reservationConfirm');

var isAM = ture;
function selectAMPM(value){
    isAM = value
    let amInput = document.querySelector('.time-am-input')
    let pmInput = document.querySelector('.time-pm-input')
    if(isAM){
        amInput.classList.add('active')
        pmInput.classList.remove('active')
    }
    else{
        pmInput.classList.add('active')
        amInput.classList.remove('active')
        
    }
}

var crntType = 'schedule'
var bottomMenuOpen = false

function toggleBottom(){
    bottomMenuOpen = ! bottomMenuOpen
    if(bottomMenuOpen)showBottom()
    else hideBottom()
}
function hideBottom(){
    let btmMenu =  document.querySelector(".bottom-menu-detail")
    let up =  document.querySelector(".up")
    let down =  document.querySelector(".down")
    down.classList.add('none')
    down.classList.remove('display')
    up.classList.add('display')
    up.classList.remove('none')

    btmMenu.classList.remove('display')
    btmMenu.classList.add('none')
}
function showBottom(){
    let btmMenu =  document.querySelector(".bottom-menu-detail")
    let up =  document.querySelector(".up")
    let down =  document.querySelector(".down")
    down.classList.add('display')
    down.classList.remove('none')
    up.classList.add('none')
    up.classList.remove('display')
    btmMenu.classList.remove('none')
    btmMenu.classList.add('display')
}