import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from "../../services/account.service";
import { Account } from "../../models/account"; // Asegúrate de usar el tipo correcto

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  username: string | null = null;
  userId: number | null = null;
  isAdding: boolean = false;
  accounts: Account[] = []; // Cambia el tipo a Account[]
  tempAccount: Account | null = null;

  constructor(private authService: AuthService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.userId = this.authService.getUserId();

    // Llama al servicio para obtener las cuentas
    if (this.userId !== null) {
      this.accountService.getAccountsByUserId(this.userId).subscribe({
        next: (accounts) => {
          this.accounts = accounts;
        },
        error: (err) => {
          console.error("Error al cargar las cuentas: ", err);
        }
      });
    }
  }

  toggleAdd(): void {
    this.isAdding = !this.isAdding;
    if (this.isAdding) {
      this.tempAccount = {
        app: { name: '', description: '', url: '' },
        user: { id: 0, username: '', password: '', email: '', role: '' }, // Objeto `User` válido
        usernameFromApp: '',
        password: ''
      };
    } else {
      this.tempAccount = null;
    }
  }


  confirmAdd(): void {
    if (this.tempAccount) {
      this.accounts.unshift(this.tempAccount);
      this.tempAccount = null;
      this.isAdding = false;
    }
  }
}
