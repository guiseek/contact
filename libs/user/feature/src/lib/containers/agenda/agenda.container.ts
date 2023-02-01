import {Component, OnInit, inject} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {
  AgendaItemAction,
  AgendaResponse,
  CreateMeeting,
  UserRole,
} from '@contact/shared/types'
import {UserFacade} from '@contact/user/data-access'
import {CreateMeetingDialog, SearchUserDialog} from '../../dialogs'

@Component({
  selector: 'user-agenda',
  templateUrl: './agenda.container.html',
  styleUrls: ['./agenda.container.scss'],
})
export class AgendaContainer implements OnInit {
  user = inject(UserFacade)
  dialog = inject(MatDialog)

  fabMenuItems = [
    {id: 'create-meeting', icon: 'add'},
    {id: 'search-user', icon: 'person_search'},
  ]

  onCreateMeeting<T extends CreateMeeting>(value: T) {
    this.user.createMeeting(value)
  }

  onAgendaItemAction([action, {meeting}]: [AgendaItemAction, AgendaResponse]) {
    switch (action) {
      case 'toggle-visibility': {
        return this.user.updateMeeting({...meeting, visible: !meeting.visible})
      }
      case 'delete-item': {
        return this.user.deleteMeeting(meeting.id)
      }
      case 'edit-item': {
        return this.user.loadOneMeeting(meeting.id)
      }
      case 'set-user': {
        return this.setUserOnMeeting(meeting.id)
      }
    }
  }

  onFabMenuSelect(action: string | number) {
    switch (action) {
      case 'create-meeting': {
        return this.openCreateMeeting()
      }
      case 'search-user': {
        return this.openSearchUser()
      }
    }
    console.log(action)
  }

  ngOnInit() {
    this.user.loadAgenda()
  }

  setUserOnMeeting(meetingId: number) {
    const searchUser$ = this.dialog.open(SearchUserDialog).afterClosed()
    const $sub = searchUser$.subscribe((user) => {
      if (user) {
        console.log(user)
        this.user.createAgendaOnMeeting(meetingId, {
          user,
          roles: [UserRole.User],
        })
        // this.user.searchUser(value)
      }
      $sub.unsubscribe()
    })
  }

  openSearchUser() {
    const searchUser$ = this.dialog.open(SearchUserDialog).afterClosed()
    const $sub = searchUser$.subscribe((value) => {
      if (value) {
        console.log(value)

        // this.user.searchUser(value)
      }
      $sub.unsubscribe()
    })
  }

  openCreateMeeting() {
    const createMeeting$ = this.dialog.open(CreateMeetingDialog).afterClosed()
    const $sub = createMeeting$.subscribe((value) => {
      if (value) {
        this.user.createMeeting(value)
      }
      $sub.unsubscribe()
    })
  }
}
