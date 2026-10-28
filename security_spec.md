# Firestore Security Specification: Ken Paxton Donation Initiative

## 1. Data Invariants

1. **User Identity & Role Protection**:
   - A user document can only be written if `request.auth.uid == userId`.
   - Normal users cannot assign themselves the `admin` role or modify privileged fields.
   - Admin status is verified through `/databases/$(database)/documents/admins/$(request.auth.uid)`.

2. **Transaction Integrity & Non-Tampering**:
   - Contributors can create transactions with their own `userId` and valid initial status (`pending` or `completed`).
   - Contributors cannot modify or alter transaction records once created (immutable).
   - Only verified administrators can update transaction statuses (e.g. flagging or auditing).

3. **Crypto Wallet Security (Admin-Only Control)**:
   - Only administrators (`isAdmin()`) can create, update, or delete cryptocurrency wallet addresses (`crypto_wallets`).
   - Public read access is permitted for active wallet addresses so contributors can select them during checkout.

4. **Branding & Settings Security**:
   - Public read access is permitted for global initiative branding (`settings`).
   - Only administrators can update website content and multiplier settings.

5. **Audit Logs & Support Messages**:
   - Support messages can be created by any user/visitor with valid email and text.
   - Only administrators can list and inspect all support messages and audit logs.

---

## 2. The Dirty Dozen Malicious Payloads

1. **Payload 1 (Privilege Escalation)**: Contributor attempts to create user profile with `"role": "admin"`. -> `PERMISSION_DENIED`
2. **Payload 2 (User Impersonation)**: Contributor A attempts to write to `/users/{contributorB_uid}`. -> `PERMISSION_DENIED`
3. **Payload 3 (Unauthenticated Transaction Write)**: Unauthenticated visitor writes to `/transactions/{txId}` without valid auth. -> `PERMISSION_DENIED`
4. **Payload 4 (Transaction Forgery)**: Authenticated user writes a transaction record with `userId` belonging to another user. -> `PERMISSION_DENIED`
5. **Payload 5 (Contributor Transaction Tampering)**: Contributor attempts to update an existing transaction amount or multiplier. -> `PERMISSION_DENIED`
6. **Payload 6 (Unauthorized Wallet Insertion)**: Non-admin user attempts to create a new crypto address in `/crypto_wallets/{id}`. -> `PERMISSION_DENIED`
7. **Payload 7 (Unauthorized Wallet Modification)**: Non-admin user attempts to replace the Bitcoin address with their own. -> `PERMISSION_DENIED`
8. **Payload 8 (Unauthorized Wallet Deletion)**: Non-admin user attempts to delete a crypto wallet. -> `PERMISSION_DENIED`
9. **Payload 9 (Branding Hijack)**: Non-admin user attempts to update `/settings/global_branding` multiplier or text. -> `PERMISSION_DENIED`
10. **Payload 10 (Admin Self-Promotion)**: Non-admin user attempts to insert a document in `/admins/{uid}`. -> `PERMISSION_DENIED`
11. **Payload 11 (Audit Log Tampering)**: Non-admin attempts to delete or alter records in `/audit_logs/{id}`. -> `PERMISSION_DENIED`
12. **Payload 12 (Cross-User Transaction Snooping)**: Contributor A attempts to `get` or `list` transaction records belonging to Contributor B without admin privileges. -> `PERMISSION_DENIED`

---

## 3. Test Runner Invariant

All 12 malicious payloads must be rejected by Firestore Security Rules with status `PERMISSION_DENIED`.
