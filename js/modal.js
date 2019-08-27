var crntType = 'cancel'

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
        case "confirm": {
            let desc = `출석처리시 ${info.userName} 회원님 1:1PT 남은 횟수가 1회 차감 됩니다.`
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
        dialogTemplate.querySelector('.beforeCounter').textContent = content.crntCount
        dialogTemplate.querySelector('.afterCounter').textContent = content.crntCount - 1
    }
    else if(content.type == 'attendance'){
        dialogTemplate.querySelector('.title').textContent = content.title
        dialogTemplate.querySelector('.longDesc').textContent = content.desc
        dialogTemplate.querySelector('.beforeCounter').textContent = content.crntCount
        dialogTemplate.querySelector('.afterCounter').textContent = content.crntCount - 1
    }
}

function openDialog(parentId, childId){

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
    let confirmTag = dialog1.querySelector('.confirm-message')
    if(confirmTag)
        confirmTag.textContent = confirmMessage
    cc.append(dialog1)
}

function closeDialog(id, status){
    var dialog1 = document.querySelector(id)
    dialog1.classList.add("none");
    dialog1.classList.remove("display");
    console.log(status)
}
